import React from 'react';
import { url } from '@Shared';
import {
  Route,
  Switch,
  Redirect,
  matchPath,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@terminal-packages/ui/core/Box';
import Stepper from '@terminal-packages/ui/core/Stepper/Stepper';
import GoBackLink from '@Shared/Layout/components/GoBackLink';
import useAddSiteMutation from '@Shared/hooks/useAddSiteMutation';
import useStyles from './styles';
import {
  ConnectWithGithub,
  BuildOptions,
  PickRepository,
} from '../../components/Steps';

const CONNECT_REPO_URL = '/connect-repository';
const CHOOSE_REPO_URL = '/choose-repository';
const DEPLOY_SETTINGS_URL = '/deployment-settings/:installationId/:accountName/:repoName';

const AddNewSite = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const teamId = url.getAccountIdFromUrl();
  const [addSite, { loading }] = useAddSiteMutation();
  const match = useRouteMatch();
  const location = useLocation();

  const stepPaths = [
    `${match.url}${CONNECT_REPO_URL}`,
    `${match.url}${CHOOSE_REPO_URL}`,
    `${match.url}${DEPLOY_SETTINGS_URL}`,
  ];
  const indexOfCurrentStep = stepPaths.findIndex(
    (path) => matchPath(location.pathname, { path, exact: true }),
  );

  const handleBackButton = () => {
    const newUrl = indexOfCurrentStep === 0
      ? url.buildUrl(null, `/teams/${teamId}/sites`)
      : url.buildUrl(null, stepPaths[indexOfCurrentStep - 1]);

    history.push(newUrl);
  };

  const stepTitles = [
    t('sites.start.connectWithGithub.step'),
    t('sites.start.pickRepository.step'),
    t('sites.start.buildOptions.step'),
  ];

  React.useEffect(() => {
    window.analytics.page('Add Site', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <div className={classes.container}>
      <GoBackLink onClick={handleBackButton} />
      <Box padding="37px 57px 48px">
        <Stepper
          title={t('sites.start.stepper.title')}
          description={t('sites.start.stepper.description')}
          stepTitles={stepTitles}
          indexOfActiveStep={indexOfCurrentStep}
        >
          <Switch>
            <Route path={`${match.url}${CONNECT_REPO_URL}`} exact>
              <ConnectWithGithub
                goToNextStep={() => {
                  history.push(url.buildUrl(null, `${match.url}${CHOOSE_REPO_URL}`));
                }}
              />
            </Route>
            <Route path={`${match.url}${CHOOSE_REPO_URL}`} exact>
              <PickRepository
                goToPreviousStep={handleBackButton}
                goToNextStep={(installationId, accountName, repoName) => {
                  history.push(
                    url.buildUrl(
                      null,
                      `${match.url}/deployment-settings/${installationId}/${accountName}/${repoName}`,
                    ),
                  );
                }}
              />
            </Route>
            <Route path={`${match.url}${DEPLOY_SETTINGS_URL}`} exact>
              <BuildOptions
                onClickDeploy={addSite}
                isDeployLoading={loading}
              />
            </Route>
            <Redirect to={url.buildUrl(null, `${match.url}${CONNECT_REPO_URL}`)} />
          </Switch>
        </Stepper>
      </Box>
    </div>
  );
};

export default AddNewSite;
