import { Octokit } from '@octokit/rest';
import useGithubToken from '@Shared/hooks/useGithubToken';

const useOctokit = ({
  auth,
  userAgent,
  baseUrl = 'https://api.github.com',
  previews,
  timeZone,
} = {}) => {
  const [, githubToken] = useGithubToken();

  return Octokit({
    auth: auth || githubToken,
    userAgent,
    baseUrl,
    previews,
    timeZone,
  });
};

export default useOctokit;
