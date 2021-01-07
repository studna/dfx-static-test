import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import PaymentMethodModal from './index';

const categoryName = 'Billing.PaymentMethod';

/* eslint-disable react/jsx-props-no-spreading */
storiesOf(categoryName, module).add('PaymentMethodModal', () => {
  const defaultProps = {
    open: boolean('open', true),
    closeModal: action('closeModal'),
  };

  return (
    <PaymentMethodModal {...defaultProps} />
  );
});
