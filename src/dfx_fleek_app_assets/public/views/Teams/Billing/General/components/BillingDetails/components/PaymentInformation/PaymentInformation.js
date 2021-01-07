import React, { useEffect, useRef } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useDispatch, useStore } from 'react-redux';
import { useTranslation } from 'react-i18next';
import queryString from 'querystring';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { url } from '@Shared';
import { openModal, PAYMENT_METHOD_MODAL } from '@Shared/modals/actions';
import CreditCardDisplay from '@Shared/CreditCardDisplay';
import Skeleton from './components/Skeleton';
import { MODAL_DEFAULT_OPEN, PAYMENT } from '../../../../constants';
import useStyles from './styles';

const PaymentInformation = ({
  paymentData,
  refetchTeamBillingInfo,
  loading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useStore().getState();
  const loadingScreen = state.loadingState.loading;
  const { t } = useTranslation();

  const defaultModalShown = useRef(false);

  const triggerModal = () => {
    dispatch(openModal(PAYMENT_METHOD_MODAL, {
      onSuccess: refetchTeamBillingInfo,
    }));
  };

  const history = useHistory();
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const defaultModalOpen = qs[MODAL_DEFAULT_OPEN];

  useEffect(() => {
    if (!loadingScreen
        && !loading
        && defaultModalOpen === PAYMENT
        && defaultModalShown.current === false) {
      defaultModalShown.current = true;
      triggerModal();
      const redirectUrl = url.buildUrl(null, null, [MODAL_DEFAULT_OPEN]);
      history.push(redirectUrl);
    }
  }, [loading, loadingScreen]);

  const cardType = get(paymentData, 'issuer');
  const fourLastDigits = get(paymentData, 'card.lastCardNumbers');


  const getContent = () => (
    <div className={classes.row}>
      <Typography variant="body2" className={classes.label}>
        {t('billingDetails.paymentInformation.paymentMethod')}
      </Typography>
      {fourLastDigits ? (
        <CreditCardDisplay
          cardType={cardType}
          fourLastDigits={fourLastDigits}
        />
      ) : (
        <Typography variant="body2" className={classes.label}>
          {t('billing.creditCardDisplay.noCreditCard')}
        </Typography>
      )}
    </div>
  );

  return (
    <CardTitled
      mainContent={t('billingDetails.paymentInformation.title')}
      classes={{ content: classes.root }}
    >
      {loading ? (
        <Skeleton />
      ) : (
        getContent()
      )}
      <GenericButton
        buttonVariant="secondary"
        overrideClass={{ button: classes.button }}
        onClick={triggerModal}
        disabled={loading}
      >
        {paymentData ? t('common.change') : t('common.addPM')}
      </GenericButton>
    </CardTitled>
  );
};

PaymentInformation.defaultProps = {
  refetchTeamBillingInfo: () => {},
  paymentData: null,
};

PaymentInformation.propTypes = {
  refetchTeamBillingInfo: PropTypes.func,
  paymentData: PropTypes.shape({
    issuer: PropTypes.string.isRequired,
    card: PropTypes.shape({
      lastCardNumbers: PropTypes.string.isRequired,
    }),
  }),
  loading: PropTypes.bool.isRequired,
};

export default PaymentInformation;
