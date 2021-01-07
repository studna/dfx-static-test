import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Box from '@material-ui/core/Box';
import { CreditCardDisplay } from '@Shared';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

const BuyDomain = (props) => {
  const {
    cost,
    onBuy,
    domain,
    loading,
    onCancel,
    renewCost,
    paymentMethod,
    onAddPaymentMethod,
  } = props;

  const classes = useStyles();
  const isPaymentMethodAvailable = paymentMethod.cardNumber && paymentMethod.type;

  return (
    <div>
      <div className={classes.textContainer}>
        <Typography variant="h6">
          <Trans
            i18nKey="addCustomDomain.buyDomain.title"
            values={{ domainName: domain }}
          />
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          <Box fontWeight={500}>
            <Trans
              i18nKey="addCustomDomain.buyDomain.subtitle"
              values={{ cost }}
            />
          </Box>
        </Typography>
        <Typography
          variant="body2"
          className={classes.detail}
        >
          <Trans
            i18nKey="addCustomDomain.buyDomain.detail"
            values={{ renewCost }}
          />
        </Typography>
      </div>
      <div className={classes.paymentContainer}>
        <Typography variant="body1">
          <Trans i18nKey="addCustomDomain.buyDomain.availablePM" />
        </Typography>
        <div className={classes.paymentMethodDetail}>
          {isPaymentMethodAvailable ? (
            <CreditCardDisplay
              fourLastDigits={paymentMethod.cardNumber}
              cardType={paymentMethod.type}
            />
          ) : (
            <Typography variant="body2" className={classes.noPaymentMethod}>
              <Trans i18nKey="addCustomDomain.buyDomain.noPaymentMethod" />
            </Typography>
          )}
          <Button
            color="primary"
            onClick={onAddPaymentMethod}
            className={classes.addPaymentButton}
          >
            <Trans
              i18nKey={isPaymentMethodAvailable
                ? 'addCustomDomain.buyDomain.changePaymentMehtod'
                : 'addCustomDomain.buyDomain.addPaymentMethod'}
            />
          </Button>
        </div>
      </div>
      <div className={classes.ctaSection}>
        <GenericButton
          onClick={isPaymentMethodAvailable ? onBuy : onAddPaymentMethod}
          loading={loading}
          buttonVariant="primary"
          overrideClass={{ button: classes.buyButton }}
        >
          <Trans
            i18nKey="addCustomDomain.buyDomain.buyCTA"
            values={{ domain }}
          />
        </GenericButton>
        <GenericButton
          disabled
          buttonVariant="primary"
          overrideClass={{ button: classes.addDomainButton }}
        >
          <Trans i18nKey="addCustomDomain.ownerPart.confirm" />
        </GenericButton>
        <GenericButton
          onClick={onCancel}
          disabled={loading}
          buttonVariant="secondary"
        >
          <Trans i18nKey="addCustomDomain.ownerPart.cancel" />
        </GenericButton>
      </div>
    </div>
  );
};

BuyDomain.defaultProps = {
  cost: 0,
  domain: null,
  renewCost: 0,
  loading: false,
  onBuy: () => {},
  paymentMethod: {},
  onCancel: () => {},
  onAddPaymentMethod: () => {},
};

BuyDomain.propTypes = {
  onBuy: PropTypes.func,
  cost: PropTypes.number,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  domain: PropTypes.string,
  renewCost: PropTypes.number,
  onAddPaymentMethod: PropTypes.func,
  paymentMethod: PropTypes.shape({
    cardNumber: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default BuyDomain;
