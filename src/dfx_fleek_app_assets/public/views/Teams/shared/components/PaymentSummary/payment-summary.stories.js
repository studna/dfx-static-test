import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  select, text,
} from '@storybook/addon-knobs';

import Step2Payment from './index';

const categoryName = 'Billing';

storiesOf(categoryName, module).add('Step2Payment', () => {
  const defaultProps = {
    planType: select('planType', [
      'pro',
      'business',
    ], 'pro'),
    price: text('price', '49.00'),
    creditCardFourLastDigits: text('creditCardFourLastDigits', '1234'),
  };

  return (
    <Step2Payment
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultProps}
    />
  );
});
