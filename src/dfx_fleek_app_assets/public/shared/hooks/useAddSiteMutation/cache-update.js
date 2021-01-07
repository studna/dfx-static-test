import { url } from '@Shared';
import GET_SITES_BY_TEAM_QUERY from '~/views/Teams/Sites/graphql/queries/get-sites-by-team';
import { LIMIT_SITES_PAGINATION } from '~/constants';

const listOfSites = (cache, { data: { addSite } }) => {
  const teamId = url.getAccountIdFromUrl();

  try {
    const startSitesCacheData = cache.readQuery({
      query: GET_SITES_BY_TEAM_QUERY,
      variables: {
        teamId,
        limit: LIMIT_SITES_PAGINATION,
      },
    });

    const startSitesNewItem = {
      ...startSitesCacheData,
      getSitesByTeam: {
        ...startSitesCacheData.getSitesByTeam,
        sites: [
          addSite,
          ...startSitesCacheData.getSitesByTeam.sites,
        ],
      },
    };

    cache.writeQuery({
      query: GET_SITES_BY_TEAM_QUERY,
      variables: {
        teamId,
        limit: LIMIT_SITES_PAGINATION,
      },
      data: startSitesNewItem,
    });
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log('Error: updating sites cache(GET_SITES_BY_TEAM_QUERY):', err);
  }
};

export default listOfSites;
