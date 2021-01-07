import React from 'react';
import { storiesOf } from '@storybook/react';

import SitesCard from './index';

const categoryName = 'SitesCard';

storiesOf(categoryName, module).add('default', () => {
  const config = {
    title: 'test123',
    published: 'Last published at 10:55 AM.',
    domain: 'pending',
    repo: 'rollsmorr/TestingApp (branch: master)',
    ipfs: 'QmNSrEbbFceXmiHHFzuTfWyU5PYDRu5hWWxzjZhUXHdzkG',
    preview: 'https://cdn.zeplin.io/5e06309c2149329a03e77400/assets/E96A670C-EC87-4C0C-8BAD-B52B6D66F1E1.png',
  };

  return (
    <SitesCard config={config} />
  );
});
