import React from 'react';
import { storiesOf } from '@storybook/react';

import SiteRow from './index';

const categoryName = 'SiteRow';

storiesOf(categoryName, module).add('default', () => {
  const props = {
    imageUrl: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
    githubUrl: 'https://github.com/Terminal-Systems',
    ipfsUrl: 'https://ipfs.io/ipfs/QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D',
    siteName: 'friendly-golick-cbe732',
    siteOwner: 'Samuele',
    lastPublishedTimestamp: '1579030220000',
    isPlaceholder: true,
    cardOnClickDestination: '/destination',
    i18n: {
      deployFrom: 'Deploys from',
      addNewSite: 'Add New Site',
      ownedBy: 'Owned by',
      lastPublished: 'Last published',
      at: 'at',
      github: 'Github',
      ipfs: 'IPFS',
      andSymbol: '&',
    },
  };
  return (
    <div style={{ margin: 20 }}>
      <SiteRow
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
});
