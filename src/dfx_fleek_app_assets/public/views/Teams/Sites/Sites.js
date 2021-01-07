import React from 'react';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';

import Box from '@terminal-packages/ui/core/Box';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import StripedList from '@terminal-packages/ui/core/StripedList';

import { newApiClient } from '@Clients';
import getAccountIdFromUrl from '@Shared/utils/get-account-id-from-url';
import NoDataOverlay, { OVERLAY_TYPES } from '@Shared/NoDataOverlay';
import useInfiniteScroll from '@Shared/hooks/useInfiniteScroll';

import SiteRow from './components/SiteRow';
import SiteRowsSkeleton from './components/SiteRowsSkeleton';

import presenter from './presenter';
import useStyles from './styles';
import { LIMIT_SITES_PAGINATION } from '~/constants';
import GET_SITES_BY_TEAM_QUERY from './graphql/queries/get-sites-by-team';

const updateCache = (previousResult, newResult) => {
  const previousSites = get(previousResult, 'getSitesByTeam.sites', []);
  const newSites = get(newResult, 'getSitesByTeam.sites', []);
  const newNextToken = get(newResult, 'getSitesByTeam.nextToken', null);

  return {
    getSitesByTeam: {
      sites: [...previousSites, ...newSites],
      nextToken: newNextToken,
      __typename: 'SiteConnection',
    },
  };
};

const TeamSites = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();
  const teamId = getAccountIdFromUrl();

  const { loading, data, fetchMore } = useQuery(GET_SITES_BY_TEAM_QUERY, {
    client: newApiClient,
    variables: {
      teamId: match.params.teamId,
      limit: LIMIT_SITES_PAGINATION,
    },
    fetchPolicy: 'cache-and-network',
  });

  const nextToken = get(data, 'getSitesByTeam.nextToken');
  useInfiniteScroll({
    nextToken,
    updateCache,
    fetchMore,
  });

  const classes = useStyles();

  const getSitesContent = () => {
    if (loading && !data) {
      return (
        <div id="test-sites-placeholder">
          <SiteRowsSkeleton
            amountRows={4}
          />
        </div>
      );
    }

    const i18n = {
      at: t('sites.at'),
      ipfs: t('sites.ipfs'),
      github: t('sites.github'),
      ownedBy: t('sites.ownedBy'),
      andSymbol: t('sites.andSymbol'),
      deployFrom: t('sites.deployFrom'),
      addNewSite: t('sites.addNewSite'),
      lastPublished: t('sites.lastPublished'),
      deployInProgress: t('sites.deployInProgress'),
      failedDeploy: t('sites.failedDeploy'),
    };

    const sites = get(data, 'getSitesByTeam.sites', []);

    return (
      <div id="test-sites">
        {
          sites.length === 0 && (
            <SiteRow
              isPlaceholder
              i18n={i18n}
            />
          )
        }
        <StripedList>
          {
            sites.map((_site) => {
              const site = presenter.getSite(_site);

              return (
                <SiteRow
                  key={_site.id}
                  i18n={i18n}
                  site={site}
                />
              );
            })
          }
          {nextToken && loading && <SiteRowsSkeleton amountRows={1} />}
        </StripedList>
      </div>
    );
  };

  const mainContent = (
    <Box padding="15px 0 25px 0">
      <div className={classes.buttonContainer}>
        <Link to={`/start/connect-repository?accountId=${teamId}`} className={classes.linkButton}>
          <GenericButton
            buttonVariant="primary"
            className={classes.button}
          >
            {t('sites.addNewSite')}
          </GenericButton>
        </Link>
      </div>
      {getSitesContent()}
    </Box>
  );

  const showContent = loading || !!get(data, 'getSitesByTeam.sites.length');

  React.useEffect(() => {
    window.analytics.page('Sites', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <>
      <NoDataOverlay
        type={OVERLAY_TYPES.SITES_LIST}
        isContentActive={showContent}
      />
      {mainContent}
    </>
  );
};

export default TeamSites;
