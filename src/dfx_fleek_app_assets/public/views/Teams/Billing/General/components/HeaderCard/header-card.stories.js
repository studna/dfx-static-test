import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderCard from './index';

const categoryName = 'Billing';

storiesOf(categoryName, module).add('HeaderCard', () => {
  const defaultProps = {
    recipient: 'Sam123',
    startDate: '2019-02-19T00:05:45.466Z',
    endDate: '2020-02-19T00:05:45.466Z',
  };
  return (
    <HeaderCard
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultProps}
    />
  );
});
