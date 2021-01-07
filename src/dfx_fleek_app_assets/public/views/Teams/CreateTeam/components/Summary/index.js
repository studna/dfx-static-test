import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import { newApiClient } from '@Clients';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { openModal, PAYMENT_METHOD_MODAL } from '@Shared/modals/actions';
import PaymentMethod from '~/views/Teams/shared/components/PaymentSummary/components/PaymentMethod';
import SummaryList from '~/views/Teams/shared/components/PaymentSummary/components/SummaryList';
import PlanHeader from '~/views/Teams/shared/components/PaymentSummary/components/PlanHeader';
import { getSummaryPlanType } from '~/views/Teams/shared/components/PaymentSummary/utils';
import { GET_PAYMENT_METHOD_INFO } from '~/shared/graphql/queries';

import useOnSubmit from '../../hooks/use-on-submit';
import useStyles from './styles';

const DEFAULT_NUMBER_OF_USERS = 3;

const Summary = ({
  teamName,
  selectedPlan,
}) => {
  const { t } = useTranslation();
  const { addTeam, loading } = useOnSubmit();
  const [paymentMethodId, setPaymentMethodId] = useState();
  const [paymentMethod, setPaymentMethod] = useState({});
  const [numberOfUsers, setNumberOfUsers] = useState(
    Math.max(selectedPlan.limitTeams, DEFAULT_NUMBER_OF_USERS),
    // ^ to handle -1 (unlimited) and -2 (custom)
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const getPaymentMethodInfo = async () => {
      if (paymentMethodId) {
        try {
          const result = await newApiClient.query({
            query: GET_PAYMENT_METHOD_INFO,
            variables: { paymentMethodId },
          });

          setPaymentMethod(get(result, 'data.getPaymentMethodInformation', {}));
        } catch (error) {
          /* eslint-disable-next-line no-console */
          console.error(error);
        }
      }
    };

    getPaymentMethodInfo();
  }, [paymentMethodId]);

  const onChangeUsersNumber = (e) => {
    if (!e.target.value) {
      setNumberOfUsers('');
    }

    const parsedValue = parseInt(e.target.value, 10);
    if (typeof parsedValue === 'number' && parsedValue > 0) {
      const newValue = parsedValue < DEFAULT_NUMBER_OF_USERS
        ? DEFAULT_NUMBER_OF_USERS
        : parsedValue;

      setNumberOfUsers(newValue);
    }
  };

  const onBlurUsersNumber = () => {
    const parsedValue = parseInt(numberOfUsers, 10);
    if (typeof parsedValue === 'number' && parsedValue > 0) {
      setNumberOfUsers(parsedValue);
    } else {
      setNumberOfUsers(DEFAULT_NUMBER_OF_USERS);
    }
  };

  const newCreditCardAction = () => dispatch(openModal(PAYMENT_METHOD_MODAL, {
    useTeamId: false,
    onSuccess: (stripeResponse) => {
      const pmId = get(stripeResponse, 'setupIntent.payment_method', '');

      setPaymentMethodId(pmId);
    },
  }));

  const limitOfMembers = get(
    selectedPlan,
    'limitTeamMembers',
    0,
  );
  const additionalUserPrice = get(
    selectedPlan,
    'extraTeamMemberPrice',
    0,
  );

  const summaryItemsList = [{
    name: getSummaryPlanType(t, selectedPlan),
    price: selectedPlan.priceMonthly,
  }];

  const numberOfAdditionalUsers = numberOfUsers - limitOfMembers;
  if (numberOfAdditionalUsers > 0) {
    summaryItemsList.push({
      name: t('team.create.stepper.step3.additionalUsersLabel', {
        userNumber: numberOfAdditionalUsers,
        pricePerUser: additionalUserPrice / 100,
      }),
      price: additionalUserPrice * numberOfAdditionalUsers,
    });
  }

  const onClickSubmit = async () => {
    try {
      await addTeam({
        variables: {
          input: {
            name: teamName,
            paymentMethodId,
            planId: selectedPlan.id,
            seatCount: numberOfUsers,
          },
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const creditCardFourLastDigits = get(paymentMethod, 'card.lastCardNumbers');
  const creditCardType = get(paymentMethod, 'issuer');

  return (
    <>
      <PlanHeader
        name={selectedPlan.name}
        description={selectedPlan.description}
        price={selectedPlan.priceMonthly}
      />
      <Typography className={classes.title}>
        {t('team.create.stepper.step3.howManyPeople')}
      </Typography>
      <InputWithError
        value={numberOfUsers}
        className={classes.input}
        onChange={onChangeUsersNumber}
        onBlur={onBlurUsersNumber}
        label={t('team.create.stepper.step3.inputLabel')}
        type="number"
      />
      <PaymentMethod
        creditCardFourLastDigits={creditCardFourLastDigits}
        creditCardType={creditCardType}
        newCreditCardAction={newCreditCardAction}
        loading={loading}
      />
      <SummaryList
        itemsList={summaryItemsList}
      />
      <GenericButton
        loading={loading}
        disabled={!creditCardFourLastDigits}
        buttonVariant="primary"
        onClick={onClickSubmit}
        className={classes.submitButton}
      >
        {t('team.create.stepper.step3.createTeam')}
      </GenericButton>
    </>
  );
};

Summary.defaultProps = {
  teamName: '',
};

Summary.propTypes = {
  selectedPlan: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    priceMonthly: PropTypes.number,
    id: PropTypes.string,
    limitNumberOfSites: PropTypes.number,
    limitTeams: PropTypes.number,
  }).isRequired,
  teamName: PropTypes.string,
};

export default Summary;
