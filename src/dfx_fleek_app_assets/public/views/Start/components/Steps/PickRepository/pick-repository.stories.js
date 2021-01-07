import React from 'react';
import { storiesOf } from '@storybook/react';

import PickRepository from './index';
import {
  organizationsList,
} from './mock-data';

const categoryName = 'Start/Steps';

storiesOf(categoryName, module).add('PickRepository', () => {
  const props = {
    title: 'Continuous Deployment: GitHub App',
    subtitle: 'Choose the repository you want to link to your site on Terminal. When you push to Git we run your build tool on our services and deploy the result.',
    searchPlaceholder: 'Search repos',
    organizationsList,
  };
  return (
    <div style={{ margin: 20 }}>
      <PickRepository
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
});
