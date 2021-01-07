import get from 'lodash/get';

const getGithubRepositoryData = (siteBySlug) => {
  const getSiteBySlug = get(siteBySlug, 'data.getSiteBySlug');
  const publishedDeployRepo = get(getSiteBySlug, 'publishedDeploy.repository');
  const latestDeployRepo = get(getSiteBySlug, 'latestDeploy.repository');
  const owner = get(publishedDeployRepo, 'owner') || get(latestDeployRepo, 'owner', '');
  const name = get(publishedDeployRepo, 'name') || get(latestDeployRepo, 'name', '');
  const branch = get(publishedDeployRepo, 'branch') || get(latestDeployRepo, 'branch', '');

  return {
    owner,
    name,
    branch,
    url: `https://github.com/${owner}/${name}`,
  };
};

export default getGithubRepositoryData;
