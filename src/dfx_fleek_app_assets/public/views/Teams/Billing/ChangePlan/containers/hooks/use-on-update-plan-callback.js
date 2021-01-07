import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import useAddSiteMutation from '@Shared/hooks/useAddSiteMutation';
import { url } from '@Shared';
import {
  URL_BUILD_OPTIONS_PARAM,
} from '~/views/Start/components/Steps/BuildOptions/components/SubmitSection/consts';

const useOnUpdatePlanCallback = () => {
  const location = useLocation();
  const [addSite, { loading }] = useAddSiteMutation();
  const history = useHistory();

  const defaultCallback = () => {
    const teamId = url.getAccountIdFromUrl();
    history.push(
      url.buildUrl(
        null,
        `/teams/${teamId}/billing/general`,
        ['buildOptionsKey'],
      ),
    );
  };

  const onUpdatePlanCallback = async () => {
    const queryParams = qs.parse(location.search || window.location.href.split('?')[1]);
    const keyInStorage = queryParams[URL_BUILD_OPTIONS_PARAM];
    if (!keyInStorage) {
      defaultCallback();
      return;
    }

    const buildOptionsParams = window.localStorage.getItem(keyInStorage);
    if (!buildOptionsParams) {
      defaultCallback();
      return;
    }

    try {
      const mutationInput = JSON.parse(buildOptionsParams);
      await addSite({
        variables: {
          input: mutationInput,
        },
      });
      window.localStorage.removeItem(keyInStorage);
    } catch (err) {
      /* eslint-disable no-console */
      console.log('Error: parse input of addSite mutation', err);
      defaultCallback();
    }
  };

  return { onUpdatePlanCallback, loading };
};

export default useOnUpdatePlanCallback;
