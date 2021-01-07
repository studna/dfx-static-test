import cloneDeep from 'lodash/cloneDeep';
import { url } from '@Shared';
import { LIMIT_DEPLOYS_PAGINATION } from '~/constants';
import { GET_DEPLOYS_BY_SITE } from '../../../../../../graphql/queries';

export const onTriggerDeployCache = (siteId) => (cache, { data: { triggerDeploy } }) => {
  try {
    const data = cache.readQuery({
      query: GET_DEPLOYS_BY_SITE,
      variables: {
        siteId,
        limit: LIMIT_DEPLOYS_PAGINATION,
      },
    });
    const newDeploy = cloneDeep(triggerDeploy);

    const newData = cloneDeep(data);

    newData.getDeploysBySite.deploys.unshift(newDeploy);

    cache.writeQuery({
      query: GET_DEPLOYS_BY_SITE,
      variables: {
        siteId,
        limit: LIMIT_DEPLOYS_PAGINATION,
      },
      data: newData,
    });
  } catch (e) {
    /* eslint-disable no-console */
    console.error(e);
  }
};

export const onTriggerDeployOnCompleted = (data, match, history) => {
  const { triggerDeploy: { id } } = data;
  const redirectUrl = url.buildUrl(null, `/sites/${match.params.siteSlug}/deploys/${id}`);
  history.push(redirectUrl);
};

export const onTriggerDeployError = (setError) => {
  setError(true);
};
