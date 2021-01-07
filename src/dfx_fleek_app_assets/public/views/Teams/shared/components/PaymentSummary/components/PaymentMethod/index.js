import React from 'react';
import CreditCardDisplay from '@Shared/CreditCardDisplay';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import useStyles from './styles';

const PaymentMethod = ({
  showTitle,
  creditCardFourLastDigits,
  creditCardType,
  newCreditCardAction,
  loading,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      {
        showTitle && (
          <Typography className={classes.title}>
            {t('billing.changePlan.step2Payment.whichPayment')}
          </Typography>
        )
      }
      {creditCardFourLastDigits ? (
        <div className={classes.creditCardInfoContainer}>
          <CreditCardDisplay
            cardType={creditCardType}
            fourLastDigits={creditCardFourLastDigits}
          />
          <GenericButton
            disabled={loading}
            onClick={newCreditCardAction}
            className={classes.addPaymentBtn}
          >
            {t('billing.changePlan.step2Payment.changePaymentMethod')}
          </GenericButton>
        </div>
      ) : (
        <div className={classes.creditCardInfoContainer}>
          <GenericButton
            buttonVariant="primary"
            disabled={loading}
            onClick={newCreditCardAction}
          >
            {t('billing.changePlan.step2Payment.addPaymentMethod')}
          </GenericButton>
        </div>
      )}
    </>
  );
};

PaymentMethod.defaultProps = {
  creditCardFourLastDigits: null,
  creditCardType: null,
  showTitle: true,
  newCreditCardAction: () => {},
  loading: false,
};

PaymentMethod.propTypes = {
  showTitle: PropTypes.bool,
  creditCardFourLastDigits: PropTypes.string,
  creditCardType: PropTypes.string,
  newCreditCardAction: PropTypes.func,
  loading: PropTypes.bool,
};

export default PaymentMethod;
