import React from 'react';
import { storiesOf } from '@storybook/react';

import BuildOptions from './index';

const categoryName = 'Start/Steps';

storiesOf(categoryName, module).add('BuildOptions', () => {
  const props = {
    title: 'Deploy settings for rollsmorr/TestingApp',
    subtitle: 'Get more control over how terminal builds and deploys your sites with these settings.',
    i18n: {
      title: 'Basic build settings',
      subtitle: 'If you\'re using a static site generator or build tool, we\'ll need these settings to build your site.',
      docs: 'Learn more in our docs',
      deploySiteMsg: 'Deploy site',
      repository: 'Repository',
      branchToDeploy: 'Branch to deploy',
      buildCommand: 'Build command',
      publishDirectory: 'Publish directory',
      branchesPlaceholder: 'No branches found',
    },
    branches: [
      {
        name: 'master',
        key: 'master',
        id: 1,
      },
    ],
    repository: 'rollsMorr/TestingApp',
  };
  return (
    <div style={{ margin: 20 }}>
      <BuildOptions
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
});
