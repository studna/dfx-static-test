/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

import DnsLink from './index';

const categoryName = 'DnsLink';

/* eslint-disable no-console */
storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    domain: text('domain', 'site-slug-1234.on.fleek.co'),
    siteId: text('domain', 'site-id'),
    domainId: text('domain', 'domain-id'),
    open: boolean('open', true),
    currentDomain: text('currentDomain', 'mydomain.com'),
    closeModal: () => console.log('closeModal'),
  };

  return (
    <DnsLink {...defaultProps} />
  );
});
