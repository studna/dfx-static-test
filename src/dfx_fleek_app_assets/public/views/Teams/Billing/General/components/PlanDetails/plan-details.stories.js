import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  select, object, number,
} from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import PlanDetails from './index';

const categoryName = 'Billing';

storiesOf(categoryName, module).add('PlanDetails', () => {
  const defaultProps = {
    startDate: '2019-02-19T00:05:45.466Z',
    planType: select('planType', [
      'basic',
      'pro',
      'business',
    ], 'basic'),
    usedBandwidth: object('usedBandwidth', {
      value: 20,
      unit: 'mb',
    }),
    usedMinutes: number('usedMinutes', 10),
    onClickChangePlan: action('onClickChangePlan'),
  };

  return (
    <PlanDetails
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultProps}
    />
  );
});
