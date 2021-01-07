import get from 'lodash/get';
import { GIT_EVENT } from '~/constants';

const getDeployLabel = (t, deploy) => {
  const gitEvent = get(deploy, 'gitEvent', null);

  if (gitEvent === GIT_EVENT.PULL_REQUEST) {
    return t('sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.deployPreview');
  }
  return t('sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.branchLabel');
};

export default getDeployLabel;
