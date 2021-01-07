import get from 'lodash/get';
import { newApiClient } from '@Clients';
import { GET_MEMBERSHIPS } from '@Shared/graphql/queries';
import { getOlderItem } from '@Shared/utils';

export const getTeamId = async () => {
  try {
    const { data } = await newApiClient.query({
      query: GET_MEMBERSHIPS,
    });

    const memberships = get(data, 'getMemberships.memberships', []) || [];
    const [firstTeam] = [...memberships].sort(getOlderItem);
    const teamId = get(firstTeam, 'teamId', null) || null;

    return teamId;
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    return null;
  }
};

export const checkIsValidRoute = (route) => !route.includes('undefined');
