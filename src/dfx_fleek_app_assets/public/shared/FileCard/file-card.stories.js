import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { IconName } from '@terminal-packages/ui/core/PreviewBox';

import FileCard from './index';

const categoryName = 'FileCard';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    fileName: text('fileName', 'meta.json'),
    lastModification: text('lastModification', 'Last modified at 6:44 PM.'),
    url: text('url', 'amplify-oidc-test-dev.storage.fleek.co/meta.json'),
    ipfsHash: text('ipfsHash', 'QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D'),
    icon: select('icon', [
      IconName.Zip,
      IconName.File,
      IconName.Folder,
    ], IconName.File),
    imageSrc: text('imageSrc', ''),
    status: select('status', [
      'error',
      'warning',
      'success',
    ], 'success'),
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div style={{ margin: 10 }}>
      <FileCard {...defaultProps} />
    </div>
  );
});
