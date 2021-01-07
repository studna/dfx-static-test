import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import PaymentMethod from './components/PaymentMethod';
import SummaryList from './components/SummaryList';
import PlanHeader from './components/PlanHeader';
import { getSummaryPlanType } from './utils';
import useStyles from './styles';

const PaymentSummary = (props) => {
  const {
    selectedPlan,
    creditCardFourLastDigits,
    creditCardType,
    newCreditCardAction,
    onSubmit,
    loading,
  } = props;

  const { t } = useTranslation();

  const classes = useStyles();

  const summaryItemsList = [{
    name: getSummaryPlanType(t, selectedPlan),
    price: selectedPlan.priceMonthly,
  }];

  const onClickSubmit = async () => {
    try {
      await onSubmit();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <div>
      <PlanHeader
        name={selectedPlan.name}
        description={selectedPlan.description}
        price={selectedPlan.priceMonthly}
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
        {t('billing.changePlan.step2Payment.updateTeam')}
      </GenericButton>
    </div>
  );
};

PaymentSummary.defaultProps = {
  creditCardFourLastDigits: null,
  creditCardType: null,
  newCreditCardAction: () => {},
  loading: false,
};

PaymentSummary.propTypes = {
  creditCardFourLastDigits: PropTypes.string,
  creditCardType: PropTypes.string,
  newCreditCardAction: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  selectedPlan: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    priceMonthly: PropTypes.number,
    id: PropTypes.string,
    limitNumberOfSites: PropTypes.number,
    limitTeams: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool,
};

export default PaymentSummary;
