import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import Box from '@terminal-packages/ui/core/Box';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { oldApiClient, newApiClient } from '@Clients';
import { CURRENT_USER, GET_TEAM_BY_ID, GET_MEMBERS_BY_TEAM } from '@Shared/graphql/queries';
import { TEAM_STATUS } from '~/constants';

import MembersList from './components/MemberList';

import useStyles from './styles';

const Members = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();

  const { teamId } = match.params;

  const getCurrentUser = useQuery(CURRENT_USER, {
    client: oldApiClient,
    variables: {
      id: teamId,
    },
  });

  const getTeamById = useQuery(GET_TEAM_BY_ID, {
    client: newApiClient,
    variables: {
      id: teamId,
    },
  });

  const { error, data, loading } = useQuery(GET_MEMBERS_BY_TEAM, {
    client: newApiClient,
    variables: {
      teamId,
    },
  });

  const members = get(data, 'getMembersByTeam', []);
  const ownerId = get(getTeamById, 'data.getTeamById.creatorId', '');
  const userId = get(getCurrentUser, 'data.getCurrentUser.user.id', '');
  const teamStatus = get(getTeamById, 'data.getTeamById.status');
  const disabledAddMember = teamStatus === TEAM_STATUS.SUSPENDED;

  React.useEffect(() => {
    window.analytics.page('Team Members', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <Box padding="15px 0 35px 0">
      {
        userId && ownerId && userId === ownerId && (
          <div className={classes.buttonContainer}>
            <Link
              className={classnames({
                [classes.linkButton]: true,
                [classes.linkButtonDisabled]: disabledAddMember,
              })}
              to={`/teams/${teamId}/members/add?accountId=${teamId}`}
            >
              <GenericButton
                buttonVariant="primary"
                className={classes.button}
                disabled={disabledAddMember}
              >
                {t('members.add')}
              </GenericButton>
            </Link>
          </div>
        )
      }
      {
        error && (
          <Alert
            severity="error"
            classes={{
              root: classes.alertRoot,
            }}
            action={(
              <Button
                size="small"
                color="inherit"
                onClick={() => window.location.reload()}
              >
                {t('members.tryAgain')}
              </Button>
            )}
          >
            {t('members.error')}
          </Alert>
        )
      }
      <MembersList
        loading={loading}
        members={members}
        ownerId={ownerId}
        isCurrentUserTeamOwner={userId === ownerId}
      />
    </Box>
  );
};

export default Members;
