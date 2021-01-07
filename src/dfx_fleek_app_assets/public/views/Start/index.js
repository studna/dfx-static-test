import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { MainContent, Breadcrumbs } from '@Shared';

import AddNewSite from './container/AddNewSite';

const Sites = () => {
  const { t } = useTranslation();
  const breadcrumbs = <Breadcrumbs />;

  return (
    <MainContent topBarContent={breadcrumbs}>
      <Helmet>
        <title>{t('sites.page_title_new_site')}</title>
      </Helmet>
      <AddNewSite />
    </MainContent>
  );
};

export default Sites;
