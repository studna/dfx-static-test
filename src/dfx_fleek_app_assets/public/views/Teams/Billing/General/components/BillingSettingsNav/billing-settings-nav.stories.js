import React from 'react';
import { storiesOf } from '@storybook/react';

import BillingSettingsNav from './index';

const categoryName = 'Billing';

storiesOf(categoryName, module).add('BillingSettingsNav', () => (
  <BillingSettingsNav />
));
