import moment from 'moment';
import get from 'lodash/get';

import { getMainDomain, getSiteName } from '@Shared';

const getRespository = (siteBySlug) => {
  const repositoryURL = get(siteBySlug, 'data.getSiteBySlug.deploySettings.repository.url', '') || '';
  const repositoryBranch = get(siteBySlug, 'data.getSiteBySlug.deploySettings.repository.branch', '') || '';

  const splittedURL = repositoryURL.split('/');

  return `${splittedURL.pop()} (branch: ${repositoryBranch})`;
};

const getSiteDetails = ({
  t,
  siteBySlug,
}) => {
  const site = get(siteBySlug, 'data.getSiteBySlug', {});
  const repository = getRespository(siteBySlug);
  const name = getSiteName(site);
  const owner = get(siteBySlug, 'data.getSiteBySlug.team.name', '') || '';
  const createdAt = get(siteBySlug, 'data.getSiteBySlug.createdAt', '') || '';
  const lastPublished = get(siteBySlug, 'data.getSiteBySlug.publishedDeploy.completedAt', '') || '';
  // const certificateType = get(siteBySlug, 'data.getSiteBySlug.sslInfo.type', '-');
  // const numberOfDomains = get(siteBySlug, 'data.getSiteBySlug.numberOfDomains', '-');
  const ipfsHash = get(siteBySlug, 'data.getSiteBySlug.publishedDeploy.ipfsHash', '-');
  const domains = get(siteBySlug, 'data.getSiteBySlug.domains', []);
  const defaultDomain = getMainDomain(domains);
  const sslType = get(defaultDomain, 'sslInfo.type', 'CLOUDFLARE');

  return {
    name,
    owner,
    repository,
    ipfsHash,
    // numberOfDomains,
    certificate: t(`sites.overview.ssl.${sslType}`),
    created: createdAt.length ? moment(createdAt).calendar() : '',
    lastPublished: lastPublished.length ? moment(lastPublished).calendar() : '',
  };
};

export default {
  getSiteDetails,
};
