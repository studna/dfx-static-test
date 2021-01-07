import { LIMIT_SITES_PAGINATION } from '~/constants';

import GET_SITES_BY_TEAM from '~/views/Teams/Sites/graphql/queries/get-sites-by-team';

// eslint-disable-next-line import/prefer-default-export
export const updateCache = (cache, removeSite, teamId) => {
  try {
    const data = cache.readQuery({
      query: GET_SITES_BY_TEAM,
      variables: {
        teamId,
        limit: LIMIT_SITES_PAGINATION,
      },
    });

    const sites = data.getSitesByTeam.sites.filter((site) => site.id !== removeSite.id);

    cache.writeQuery({
      query: GET_SITES_BY_TEAM,
      variables: {
        teamId,
        limit: LIMIT_SITES_PAGINATION,
      },
      data: {
        ...data,
        getSitesByTeam: {
          ...data.getSitesByTeam,
          sites,
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error when trying to update GET_SITES_BY_TEAM query: ', error.message);
  }
};
