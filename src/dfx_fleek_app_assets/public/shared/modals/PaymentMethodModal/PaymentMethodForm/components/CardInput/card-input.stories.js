/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadStripe } from '@stripe/stripe-js';
import { action } from '@storybook/addon-actions';
import { Elements } from '@stripe/react-stripe-js';

import CardInput from './index';

const categoryName = 'Billing.PaymentMethod.Components';

storiesOf(categoryName, module).add('CardInput', () => {
  const defaultProps = {
    onChange: action('onChange'),
  };

  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  return (
    <div
      style={{
        padding: 20,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Elements stripe={stripePromise}>
        <CardInput {...defaultProps} />
      </Elements>
    </div>
  );
});
