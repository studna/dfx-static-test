import React from 'react';
import get from 'lodash/get';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';

import { newApiClient } from '@Clients';
import { MainContent, Breadcrumbs } from '@Shared';

import AddCustomDomainForm from './container/AddCustomDomainForm';

import { GET_SITE_BY_SLUG } from '../graphql/queries';

const Sites = () => {
  const match = useRouteMatch();
  const { t } = useTranslation();

  const { data } = useQuery(GET_SITE_BY_SLUG, {
    client: newApiClient,
    variables: {
      slug: match.params.siteSlug,
    },
    fetchPolicy: 'cache-and-network',
  });

  const siteId = get(data, 'getSiteBySlug.id', '');

  const breadcrumbs = <Breadcrumbs />;

  return (
    <MainContent topBarContent={breadcrumbs}>
      <Helmet>
        <title>{t('addCustomDomain.pageTitle')}</title>
      </Helmet>
      <AddCustomDomainForm
        siteId={siteId}
        siteSlug={match.params.siteSlug}
      />
    </MainContent>
  );
};

export default Sites;
