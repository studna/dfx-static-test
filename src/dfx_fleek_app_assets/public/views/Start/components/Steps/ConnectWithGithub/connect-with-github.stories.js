import React from 'react';
import { storiesOf } from '@storybook/react';

import ConnectWithGithub from './index';

const categoryName = 'Start/Steps';

storiesOf(categoryName, module).add('ConnectWithGithub', () => {
  const props = {
    title: 'Continuous Deployment',
    subtitle: 'When you push to Git we run your build tool on our services and deploy the result.',
    message: 'Connect with Github',
  };
  return (
    <div style={{ margin: 20 }}>
      <ConnectWithGithub
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
});
