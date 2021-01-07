import React, { useEffect } from 'react';
import get from 'lodash/get';
import queryString from 'query-string';
import { useMutation } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';

import { LoadingScreen } from '@Shared';
import { newApiClient } from '@Clients';
import { GET_MEMBERSHIPS } from '@Shared/graphql/queries';
import { ADD_TEAM_MEMBER } from '@Shared/graphql/mutations';

const Invitation = () => {
  const history = useHistory();
  const location = useLocation();

  const [addTeamMemberMutation] = useMutation(ADD_TEAM_MEMBER, {
    client: newApiClient,
    update: (cache, { data: { addTeamMember } }) => {
      try {
        const data = cache.readQuery({
          query: GET_MEMBERSHIPS,
        });

        const newMemberships = [...data.getMemberships.memberships, { ...addTeamMember }];

        cache.writeQuery({
          query: GET_MEMBERSHIPS,
          data: {
            ...data,
            getMemberships: {
              ...data.getMemberships,
              memberships: newMemberships,
            },
          },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error when trying to update GET_MEMBERSHIPS query: ', error.message);
      }
    },
  });

  useEffect(() => {
    const {
      token: invitationToken,
      invitation: invitationId,
    } = queryString.parse(location.search);

    async function addTeamMember() {
      try {
        const { data } = await addTeamMemberMutation({
          variables: {
            input: {
              invitationId,
              invitationToken,
            },
          },
        });

        if (data.addTeamMember) {
          const teamId = get(data.addTeamMember, 'teamId');

          if (teamId) {
            history.replace(`/teams/${teamId}/sites?accountId=${teamId}`);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error when trying to add team member: ${error.message}`);

        history.push('/');
      }
    }

    if (invitationId && invitationToken) {
      addTeamMember();
    }
  }, []);

  return (
    <LoadingScreen />
  );
};

export default Invitation;
