import get from 'lodash/get';
import { useHistory } from 'react-router-dom';
import { newApiClient } from '@Clients';
import { useMutation } from '@apollo/react-hooks';
import { GET_MEMBERSHIPS } from '@Shared/graphql/queries';
import { url } from '@Shared';
import ADD_TEAM from '../graphql/mutations/add-team';

const updateCacheUponAddTeam = (cache, { data }) => {
  try {
    const cachedData = cache.readQuery({ query: GET_MEMBERSHIPS });
    const cachedMemberships = cachedData.getMemberships.memberships;
    const newMembership = {
      teamId: data.addTeam.id,
      teamName: data.addTeam.name,
      accessLevel: 'admin',
      createdAt: new Date().toUTCString(),
      __typename: 'Membership',
    };

    cache.writeQuery({
      query: GET_MEMBERSHIPS,
      data: {
        ...cachedData,
        getMemberships: {
          ...cachedData.getMemberships,
          memberships: [
            ...cachedMemberships,
            newMembership,
          ],
        },
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error: Updating memberships cache', err);
  }
};

const useOnSubmit = () => {
  const history = useHistory();

  const [addTeam, { loading: addTeamLoading }] = useMutation(ADD_TEAM, {
    client: newApiClient,
    update: updateCacheUponAddTeam,
    onCompleted: (data) => {
      const team = get(data, 'addTeam');
      if (team) {
        const newUrl = url.buildUrl(
          { accountId: team.id },
          `/teams/${team.id}/sites`,
        );

        history.push(newUrl);
      }
    },
  });

  return {
    addTeam,
    loading: addTeamLoading,
  };
};

export default useOnSubmit;
