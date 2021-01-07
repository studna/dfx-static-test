import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LoadingScreen } from '@Shared';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';

import { getTeamId, checkIsValidRoute } from './utils';
import MainContent from '../../shared/MainContent';

import auth from '../../auth';

const defaultRedirect = async (history) => {
  const teamId = await getTeamId();

  if (teamId) {
    history.push(`/teams/${teamId}/sites?accountId=${teamId}`);
  } else {
    history.push('/');
  }
};


const AuthCallback = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const hash = location.hash.substr(1);
    const hashQS = auth.getQSFromHash(hash);
    console.log({hash,hashQS})
    const processRedirect = async () => {
      if (hashQS && hashQS.access_token) {
        auth.setIdToken(hashQS.id_token);
        auth.setAccessToken(hashQS.access_token);

        if (hashQS.state) {
          const redirectTo = `/${decodeURIComponent(hashQS.state)}`;
          const isValidRoute = checkIsValidRoute(redirectTo);

          if (isValidRoute) {
            history.push(redirectTo);
          } else {
            await defaultRedirect(history);
          }

          return;
        }

        await defaultRedirect(history);
      }
    };

    processRedirect();
  }, []);

  return (
    <MainContent>
      <Helmet>
        <title>{t('auth.page_title')}</title>
      </Helmet>
      <LoadingScreen />
    </MainContent>
  );
};

export default AuthCallback;
