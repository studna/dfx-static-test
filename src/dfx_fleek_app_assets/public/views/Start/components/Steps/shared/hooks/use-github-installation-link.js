import { useState, useEffect } from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import getAccountIdFromUrl from '@Shared/utils/get-account-id-from-url';
import { newApiClient } from '@Clients';
import { AUTHORIZATION_COMPLETED } from '~/views/GithubAuthorized/constants';

import GET_GITHUB_INSTALLATION_LINK_QUERY from '../graphql/get-github-installation-url-query';

const useGithubInstallationLink = () => {
  const [
    isSettingPermissionsCompleted,
    setIsSettingPermissionsCompleted,
  ] = useState(false);
  const [userWantedToOpenGithub, setUserWantedToOpenGithub] = useState(false);
  // ^ this state is useful, because we cannot open window until two conditional are true:
  // 1. User clicked github authorization button
  // 2. We got a link to github

  const teamId = getAccountIdFromUrl();
  const { data: githubInstallLinkData } = useQuery(
    GET_GITHUB_INSTALLATION_LINK_QUERY,
    {
      variables: { teamId },
      client: newApiClient,
    },
  );
  const githubInstallLink = get(githubInstallLinkData, 'getGithubInstallationUrl');

  if (githubInstallLink && userWantedToOpenGithub) {
    const popupWidth = 1200;
    const popupHeight = 640;
    const leftPosition = (window.innerWidth - popupWidth) / 2;
    const topPosition = (window.innerHeight - popupHeight) / 2;
    window.open(
      githubInstallLink,
      'github-authorization-window',
      `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`,
    );
    setUserWantedToOpenGithub(false);
  }

  const updateLocalStorage = (event) => {
    const localStorageValue = event.storageArea.getItem(AUTHORIZATION_COMPLETED);
    event.storageArea.removeItem(AUTHORIZATION_COMPLETED);
    if (localStorageValue) {
      setIsSettingPermissionsCompleted(true);
    }
  };
  // should be in useEffect

  useEffect(() => {
    window.addEventListener('storage', updateLocalStorage);
    return () => window.removeEventListener('storage', updateLocalStorage);
  }, []);

  useEffect(() => {
    if (isSettingPermissionsCompleted) {
      // reset to initial state
      setUserWantedToOpenGithub(false);
      setIsSettingPermissionsCompleted(false);
    }
  }, [isSettingPermissionsCompleted]);

  const openGithubPermissionsPopup = () => {
    setUserWantedToOpenGithub(true);
  };

  return {
    isSettingPermissionsCompleted,
    openGithubPermissionsPopup,
  };
};

export default useGithubInstallationLink;
