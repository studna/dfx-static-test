import React from 'react';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router';

import ErrorComponent from '@terminal-packages/ui/core/Error';

import { url } from '@Shared';
import { newApiClient } from '@Clients';
import useAccountId from '@Shared/hooks/useAccountId';
import { GET_MEMBERSHIPS } from '@Shared/graphql/queries';

import useStyles from './styles';
import MainContent from '../../shared/MainContent';

const Error = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const accountId = useAccountId();
  const { data } = useQuery(GET_MEMBERSHIPS, {
    client: newApiClient,
  });

  React.useEffect(() => {
    const memberships = get(data, 'getMemberships.memberships', []) || [];
    const membership = memberships.find((_membership) => _membership.teamId === accountId);

    if (!membership && memberships.length) {
      const newUrl = url.buildUrl({
        accountId: memberships[0].teamId,
      });

      history.replace(newUrl);
    }
  }, [data]);

  const errorCode = parseInt(get(params, 'errorCode', 500), 10);

  return (
    <MainContent>
      <div className={classes.root}>
        <ErrorComponent
          code={errorCode}
          title={t(`errors.${errorCode}.title`)}
          subtitle={t(`errors.${errorCode}.description`)}
          hexImage="https://storage.googleapis.com/terminal-assets/images/404%20hex.png"
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/teams/${accountId}/sites?accountId=${accountId}`}
          >
            {t(`errors.${errorCode}.cta`)}
          </Button>
        </ErrorComponent>
      </div>
    </MainContent>
  );
};

export default Error;
