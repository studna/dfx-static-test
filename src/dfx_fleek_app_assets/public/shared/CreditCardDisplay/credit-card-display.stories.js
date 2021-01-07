import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  text,
} from '@storybook/addon-knobs';

import CreditCardDisplay from './index';

const categoryName = 'Billing';

storiesOf(categoryName, module).add('CreditCardDisplay', () => {
  const defaultProps = {
    fourLastDigits: text('fourLastDigits', '4444'),
    cardType: text('cardType', 'visa'),
  };

  return (
    <CreditCardDisplay
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultProps}
    />
  );
});
