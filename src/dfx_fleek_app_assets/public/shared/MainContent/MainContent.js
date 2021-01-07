import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { GET_TEAM_BY_ID } from '@Shared/graphql/queries';
import { url } from '@Shared';
import { newApiClient } from '@Clients';
import LayoutStructure from '@terminal-packages/ui/core/LayoutStructure';
import { ID_OF_SCROLLABLE_ELEMENT, TEAM_STATUS } from '~/constants';
import AccountSuspensionBanner from '../AccountSuspensionBanner';

import useStyles from './styles';

const MainContent = (props) => {
  const {
    children,
    topBarContent,
  } = props;

  const teamId = url.getAccountIdFromUrl();

  const getTeamById = useQuery(GET_TEAM_BY_ID, {
    client: newApiClient,
    variables: {
      id: teamId,
    },
    skip: !teamId,
  });

  const teamStatus = get(getTeamById, 'data.getTeamById.status');

  const isAccountSuspensionBanner = teamStatus === TEAM_STATUS.RESTRICTED
    || teamStatus === TEAM_STATUS.SUSPENDED;

  const classes = useStyles({
    isTopbar: !!topBarContent,
    isAccountSuspensionBanner,
  });

  return (
    <div className={classes.root}>
      {topBarContent && (
        <div className={classes.topBar}>
          <LayoutStructure
            overrideClass={{
              wrapper: classes.topbarContent,
            }}
          >
            {topBarContent}
          </LayoutStructure>
        </div>
      )}
      <div className={classes.contentWrapper} id={ID_OF_SCROLLABLE_ELEMENT}>
        <LayoutStructure
          overrideClass={{
            wrapper: classes.content,
          }}
        >
          {children}
        </LayoutStructure>
      </div>
      <AccountSuspensionBanner
        isSuspended={teamStatus === TEAM_STATUS.SUSPENDED}
      />
    </div>
  );
};

MainContent.defaultProps = {
  children: null,
  topBarContent: null,
};

MainContent.propTypes = {
  children: PropTypes.node,
  topBarContent: PropTypes.node,
};

export default MainContent;
