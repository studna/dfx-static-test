import get from 'lodash/get';
import {
  getMainDomain,
  getSiteName,
  getSiteDateText,
  getGithubRepositoryData,
} from '@Shared';
import { DEPLOY_STATUS } from '~/constants';

const getRepository = (siteBySlug) => {
  const {
    owner,
    name,
    branch,
    url,
  } = getGithubRepositoryData(siteBySlug);

  return {
    repository: `${owner}/${name} (branch: ${branch})`,
    repositoryUrl: `${url}/tree/${branch}`,
  };
};

const getSubtitle = (t, status, siteBySlug) => {
  if (status === DEPLOY_STATUS.FAILED) {
    return t('sites.tabs.deploys.sections.deployStatus.deployFailed');
  }
  return getSiteDateText(t, {
    isPublished: !!get(siteBySlug, 'data.getSiteBySlug.publishedDeploy'),
    createdAt: get(siteBySlug, 'data.getSiteBySlug.createdAt'),
    lastPublishAt: get(siteBySlug, 'data.getSiteBySlug.publishedDeploy.completedAt'),
  });
};

const getSiteCard = ({ t, siteBySlug }) => {
  const repositoryData = getRepository(siteBySlug);
  const site = get(siteBySlug, 'data.getSiteBySlug', {});
  const title = getSiteName(site);
  const siteId = get(siteBySlug, 'data.getSiteBySlug.id', '');
  const status = get(siteBySlug, 'data.getSiteBySlug.publishedDeploy.status', null) || get(siteBySlug, 'data.getSiteBySlug.latestDeploy.status', '');
  const domains = get(siteBySlug, 'data.getSiteBySlug.domains', []);
  const defaultDomain = getMainDomain(domains);
  const defaultDomaintype = get(defaultDomain, 'type', '');
  const defaultDomainName = get(defaultDomain, 'domain', '');
  const preview = get(siteBySlug, 'data.getSiteBySlug.publishedDeploy.previewImage', '');
  const ipfsHash = get(siteBySlug, 'data.getSiteBySlug.publishedDeploy.ipfsHash', null);
  const subtitle = getSubtitle(t, status, siteBySlug);

  return {
    siteId,
    title,
    status,
    preview,
    ipfsHash,
    defaultDomaintype,
    defaultDomain: defaultDomainName,
    subtitle,
    ...repositoryData,
  };
};

export default {
  getSiteCard,
};
