import get from 'lodash/get';
import { useAccountId } from '@Shared';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { newApiClient } from '@Clients';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from '@terminal-packages/ui/core/Toast';
import { GET_TEAM_BY_ID } from '@Shared/graphql/queries';
import BaseModal from '@terminal-packages/ui/core/BaseModal';

import useStyles from './styles';
import presenter from './presenter';
import { stripePromise } from '../../Stripe';
import PaymentMethodForm from './PaymentMethodForm';
import { saveClientSecret, deleteClientSecret } from './actions';
import {
  SETUP_BILLING_INTENT,
  ATTACH_PAYMENT_METHOD,
  SETUP_BILLING_INTENT_WITHOUT_TEAM_ID,
} from '../../graphql/mutations';

const PaymentMethodModal = (props) => {
  const {
    open,
    useTeamId,
    closeModal,
    onSuccess: onSuccessCB,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = presenter(t);
  const dispatch = useDispatch();

  const teamId = useAccountId();

  const [setupBillingIntent] = useMutation(SETUP_BILLING_INTENT, {
    client: newApiClient,
  });

  const [setupBillingIntentWithoutTeamId] = useMutation(
    SETUP_BILLING_INTENT_WITHOUT_TEAM_ID,
    { client: newApiClient },
  );

  const [attachPaymentMethod] = useMutation(ATTACH_PAYMENT_METHOD, {
    client: newApiClient,
  });

  const clientSecret = useSelector((state) => state.billing.clientSecretId);

  const onSuccess = async (stripeResponse) => {
    dispatch(deleteClientSecret());

    let isPaymentMethodAdded = false;

    if (!stripeResponse.error) {
      if (useTeamId) {
        try {
          const result = await attachPaymentMethod({
            variables: {
              teamId,
              paymentMethodId: get(stripeResponse, 'setupIntent.payment_method'),
            },
            refetchQueries: [{
              query: GET_TEAM_BY_ID,
              variables: { id: teamId },
            }],
          });

          isPaymentMethodAdded = result.data;
        } catch (error) {
          /* eslint-disable-next-line no-console */
          console.error(error);
        }
      } else {
        isPaymentMethodAdded = true;
      }

      const toastTrigger = isPaymentMethodAdded ? toast.success : toast.error;
      const message = isPaymentMethodAdded
        ? 'modals.paymentMethod.success'
        : 'modals.paymentMethod.error';


      toastTrigger(t(message), { autoClose: 6000 });

      closeModal();
      onSuccessCB(stripeResponse);
    }
  };

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const setupBillingMutation = useTeamId
          ? setupBillingIntent
          : setupBillingIntentWithoutTeamId;

        const mutationName = useTeamId
          ? 'setupBillingIntent'
          : 'setupBillingIntentWithoutTeam';

        const result = await setupBillingMutation({
          variables: {
            ...(useTeamId && { teamId }),
          },
        });

        const intentId = get(result, `data.${mutationName}.intentId`);

        if (intentId) {
          dispatch(saveClientSecret(intentId));
        }
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error(error);
      }
    };

    if (!clientSecret) {
      getClientSecret();
    }
  }, []);

  return (
    <BaseModal
      open={open}
      maxWidth={460}
      onClose={() => closeModal()}
      title={i18n.title}
      disableAutoFocus
      disableEnforceFocus
    >
      <Elements stripe={stripePromise}>
        <PaymentMethodForm
          i18n={i18n}
          onSuccess={onSuccess}
          className={classes.form}
          clientSecret={clientSecret}
        />
      </Elements>
    </BaseModal>
  );
};

PaymentMethodModal.defaultProps = {
  open: false,
  useTeamId: true,
  onSuccess: () => {},
  closeModal: () => {},
};

PaymentMethodModal.propTypes = {
  open: PropTypes.bool,
  onSuccess: PropTypes.func,
  closeModal: PropTypes.func,
  useTeamId: PropTypes.bool,
};

export default PaymentMethodModal;
