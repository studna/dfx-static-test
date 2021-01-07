import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object } from '@storybook/addon-knobs';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import PaymentMethodForm from './index';

const categoryName = 'Billing.PaymentMethod';

const stripePromise = loadStripe('pk_test_I0C82wfFLuSJ8Iw0hA5RQgIa00mUfJJ5MD');

/* eslint-disable react/jsx-props-no-spreading */
storiesOf(categoryName, module).add('Form', () => {
  const defaultProps = {
    clientSecret: text('clientSecret', 'seti_1GGQSCBVTnPY2Miu2wgopgQG_secret_Go2XMevkji6yDb5hIMzzSKifBWu4pxF'),
    onSuccess: action('onSuccess'),
    i18n: object('i18n', {
      inputs: {
        name: {
          label: 'Name',
          placeholder: 'Jane Doe',
        },
        country: {
          label: 'Country',
          placeholder: 'Choose Country',
        },
        cta: 'Save',
      },
      error: {
        title: 'Error',
        name: "Name field can't be blank",
        country: "Country field can't be blank",
        card: 'Invalid card data',
        internal: 'Internal error, please try again',
      },
    }),
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <Elements stripe={stripePromise}>
        <PaymentMethodForm {...defaultProps} />
      </Elements>
    </div>
  );
});
