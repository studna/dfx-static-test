import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  boolean, array,
} from '@storybook/addon-knobs';

import PlanDetails from './index';

const categoryName = 'Billing';

storiesOf(categoryName, module).add('Invoices', () => {
  const defaultProps = {
    invoices: array('invoices', [
      {
        price: 4999,
        fourLastDigits: '1234',
        creditCardName: 'Amex',
        timestamp: '2020-04-01T11:41:38.289Z',
      },
      {
        price: 4999,
        fourLastDigits: '1234',
        creditCardName: 'Amex',
        timestamp: '2020-04-01T11:41:38.289Z',
      },
      // {
      //   price: 4999,
      //   fourLastDigits: '1234',
      //   creditCardName: 'Amex',
      //   timestamp: '2020-04-01T11:41:38.289Z',
      // },
      // {
      //   price: 4999,
      //   fourLastDigits: '1234',
      //   creditCardName: 'Amex',
      //   timestamp: '2020-04-01T11:41:38.289Z',
      // },
      // {
      //   price: 4999,
      //   fourLastDigits: '1234',
      //   creditCardName: 'Amex',
      //   timestamp: '2020-04-01T11:41:38.289Z',
      // },
      // {
      //   price: 4999,
      //   fourLastDigits: '1234',
      //   creditCardName: 'Amex',
      //   timestamp: '2020-04-01T11:41:38.289Z',
      // },
    ]),
    loading: boolean('loading', false),
  };

  return (
    <PlanDetails
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultProps}
    />
  );
});
