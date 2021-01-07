import { useRef } from 'react';
import useGithubToken from '@Shared/hooks/useGithubToken';
import useGithubInstallationLink from '../../shared/hooks/use-github-installation-link';

const useFetchGithubToken = (onFetchGithubToken) => {
  const permissionsWereCompleted = useRef(false);
  const {
    isSettingPermissionsCompleted,
    openGithubPermissionsPopup,
  } = useGithubInstallationLink();

  if (isSettingPermissionsCompleted) {
    permissionsWereCompleted.current = true;
  }

  const [isLoading, githubToken] = useGithubToken({
    skip: !permissionsWereCompleted.current,
    fetchPolicy: 'network-only',
  });

  if (!isLoading && githubToken) {
    onFetchGithubToken();
  }

  return openGithubPermissionsPopup;
};

export default useFetchGithubToken;
