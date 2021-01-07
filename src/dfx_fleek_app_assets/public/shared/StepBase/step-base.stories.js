import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '@material-ui/core/Button';

import StepBase from './index';

const categoryName = 'Start/Steps';

storiesOf(categoryName, module).add('StepBase', () => {
  const props = {
    title: 'Continuous Deployment',
    subtitle: 'When you push to Git we run your build tool on our services and deploy the result.',
  };
  return (
    <div style={{ margin: 20 }}>
      <StepBase
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <div style={{ width: 284, marginTop: 10 }}>
          <Button variant="contained" color="primary" style={{ width: '100%' }}>
            Children Button
          </Button>
        </div>
      </StepBase>
      <br />
      <hr />
      <br />
      <StepBase
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <ul>
          <li>Children list item</li>
          <li>Children list item</li>
        </ul>
      </StepBase>
    </div>
  );
});
