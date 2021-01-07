import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { getCards, CARD_TYPES } from './credit-cards';

import useStyles from './styles';

const CreditCardDisplay = (props) => {
  const classes = useStyles();
  const {
    cardType,
    fourLastDigits,
  } = props;

  const { t } = useTranslation();

  const cards = getCards(t);

  const currentCard = cards[cardType] || cards[CARD_TYPES.DEFAULT];

  return (
    <div className={classes.container}>
      <img
        className={classes.creditCardIcon}
        src={currentCard.logo}
        alt={currentCard.name}
      />
      <span>
        <Trans
          i18nKey="billing.creditCardDisplay.text"
          values={{
            type: currentCard.name,
            digits: fourLastDigits,
          }}
          components={[
            null,
            <span className={classes.boldText}>LAST_4_DIGITS</span>,
          ]}
        />
      </span>
    </div>
  );
};

CreditCardDisplay.propTypes = {
  cardType: PropTypes.oneOf(Object.values(CARD_TYPES)).isRequired,
  fourLastDigits: PropTypes.string.isRequired,
};

export default CreditCardDisplay;
