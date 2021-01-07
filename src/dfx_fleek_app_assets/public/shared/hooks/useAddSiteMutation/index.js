import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { newApiClient } from '@Clients';
import { url } from '@Shared';
import ADD_SITE_MUTATION from '~/views/Start/container/AddNewSite/graphql/mutations/add-site';
import addSiteUpdateCache from './cache-update';

const useAddSiteMutation = () => {
  const history = useHistory();

  const addSiteOnCompleted = (siteSlug, deployId) => (
    history.push(
      url.buildUrl(
        null,
        `/sites/${siteSlug}/deploys/${deployId}`,
        ['buildOptionsKey'],
      ),
    ));

  const mutationResult = useMutation(ADD_SITE_MUTATION, {
    client: newApiClient,
    update: addSiteUpdateCache,
    onCompleted: (responseData) => addSiteOnCompleted(
      responseData.addSite.slug,
      responseData.addSite.latestDeploy.id,
    ),
  });

  return mutationResult;
};

export default useAddSiteMutation;
