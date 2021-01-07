import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import ChangePlanForm from './containers/ChangePlanForm';


const ChangePlan = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('billing.changePlan.pageTitle')}</title>
      </Helmet>
      <ChangePlanForm />
    </>
  );
};

export default ChangePlan;
