import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { oldApiClient } from '@Clients';
import { url } from '@Shared';
import { CURRENT_USER } from '@Shared/graphql/queries';
import TerminalUserMenu from '@terminal-packages/ui/core/UserMenu';
import { intercom } from '~/integrations';

import auth from '../../../../auth';
import getConfig, { LOG_OUT_ITEM, SETTINGS_ITEM } from './get-config';

const actions = {
  [LOG_OUT_ITEM.key]: () => { intercom.shutdown(); auth.signout(); },
  [SETTINGS_ITEM.key]: ({ history }) => {
    history.push(url.buildUrl(null, '/settings/general/profile'));
  },
};

const UserMenu = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [skip, setSkip] = useState(!auth.isAuthenticated);

  // skip query is user is not authenticated
  const currentUser = useQuery(CURRENT_USER, {
    skip,
    client: oldApiClient,
    onCompleted: () => {
      const { user } = getConfig(currentUser, t);
      const { id, ...userInfo } = user;

      window.analytics.identify(id, {
        ...userInfo,
      });
    },
  });
  const { user, i18n, items } = getConfig(currentUser, t);

  const handleClick = (action) => {
    actions[action]({ history });
  };

  useEffect(() => {
    // if user is not authenticated, listen to onUserAuth and avoid query skip
    if (!auth.isAuthenticated) {
      const removeListener = auth.onListen(auth.events.onUserAuth, (isAuthenticated) => {
        if (isAuthenticated) {
          // remove listener, user is already authenticated
          removeListener();

          setSkip(false);
        }
      });
    }
  }, []);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <TerminalUserMenu
      onItemClick={handleClick}
      user={user}
      i18n={i18n}
      items={items}
    />
  );
};

export default UserMenu;
