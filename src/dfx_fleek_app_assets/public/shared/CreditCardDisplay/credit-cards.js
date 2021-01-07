import visa from 'payment-icons/min/mono/visa.svg';
import amex from 'payment-icons/min/mono/amex.svg';
import mastercard from 'payment-icons/min/mono/mastercard.svg';
import discover from 'payment-icons/min/mono/discover.svg';
import defaultCard from 'payment-icons/min/mono/default.svg';

export const CARD_TYPES = {
  AMEX: 'AMEX',
  VISA: 'VISA',
  MASTERCARD: 'MASTERCARD',
  DISCOVER: 'DISCOVER',
  DEFAULT: 'UNKNOWN',
};

const {
  AMEX, VISA, MASTERCARD, DISCOVER, DEFAULT,
} = CARD_TYPES;

export const getCards = (t) => ({
  [AMEX]: {
    name: t('billing.creditCardDisplay.creditCardTypes.amex'),
    logo: amex,
  },
  [VISA]: {
    name: t('billing.creditCardDisplay.creditCardTypes.visa'),
    logo: visa,
  },
  [MASTERCARD]: {
    name: t('billing.creditCardDisplay.creditCardTypes.mastercard'),
    logo: mastercard,
  },
  [DISCOVER]: {
    name: t('billing.creditCardDisplay.creditCardTypes.discover'),
    logo: discover,
  },
  [DEFAULT]: {
    name: t('billing.creditCardDisplay.creditCardTypes.defaultCard'),
    logo: defaultCard,
  },
});
