import get from 'lodash/get';
import { getSiteName, url } from '@Shared';

const getSite = (site) => {
  const slug = get(site, 'slug');
  const siteName = getSiteName(site);
  const siteOwner = get(site, 'team.name', '-');
  const ipfsHash = get(site, 'latestDeploy.ipfsHash');
  const imageUrl = get(site, 'latestDeploy.previewImage');
  const githubUrl = get(site, 'latestDeploy.repository.url');
  const lastPublishedTimestamp = get(site, 'latestDeploy.completedAt', '');
  const status = get(site, 'publishedDeploy.status', null) || get(site, 'latestDeploy.status', '');
  const ipfsUrl = ipfsHash ? `https://ipfs.io/ipfs/${ipfsHash}` : null;
  const cardOnClickDestination = url.buildUrl(null, `/sites/${slug}/overview`);

  return {
    ipfsUrl,
    siteName,
    imageUrl,
    githubUrl,
    siteOwner,
    cardOnClickDestination,
    lastPublishedTimestamp,
    status,
  };
};

export default {
  getSite,
};
