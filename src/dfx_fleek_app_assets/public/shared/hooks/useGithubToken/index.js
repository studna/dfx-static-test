import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import { newApiClient } from '@Clients';
import getAccountIdFromUrl from '@Shared/utils/get-account-id-from-url';
import GET_GITHUB_TOKEN_QUERY from './get-github-token-query';

const useGithubToken = (queryOptions = {}) => {
  const teamId = getAccountIdFromUrl();
  const githubTokenRes = useQuery(GET_GITHUB_TOKEN_QUERY, {
    client: newApiClient,
    variables: { teamId },
    skip: !teamId,
    ...queryOptions,
  });

  const githubToken = get(githubTokenRes, 'data.getGithubToken');

  return [githubTokenRes.loading, githubToken];
};

export default useGithubToken;
