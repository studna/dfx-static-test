import CID from 'cids';
import get from 'lodash/get';
import { getGatewayUrl } from '@Shared/utils';
import { DEPLOY_STATUS } from '~/constants';
import { getFormattedDate } from '../../shared/utils';
import util from '~/shared/modals/ChangeSiteName/util';

const getPreviewUrl = ({ pullRequestUrl, ipfsHash }) => {
  if (!ipfsHash) {
    return null;
  }
  if (pullRequestUrl) {
    const cid = new CID(ipfsHash);
    return `https://${cid.toV1().toString()}${util.getFleekSubdomain()}`;
  }
  return getGatewayUrl(ipfsHash);
};

const deployMapping = (deploy, t) => {
  const {
    status,
    published = false,
    startedAt = null,
    pullRequestUrl,
  } = deploy;

  const branch = get(deploy, 'repository.branch', '');
  const commit = get(deploy, 'repository.commit', '');
  const newStartedAt = startedAt ? getFormattedDate(startedAt, t) : '';

  return ({
    status,
    inProgress: status === DEPLOY_STATUS.IN_PROGRESS,
    published,
    branch,
    commit,
    startedAt: newStartedAt,
    previewUrl: getPreviewUrl(deploy),
    pullRequestUrl,
  });
};

export default deployMapping;
