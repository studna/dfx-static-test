import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import get from 'lodash/get';
// import Typography from '@material-ui/core/Typography';
// import { useQuery } from '@apollo/react-hooks';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
// import IconFA from '@terminal-packages/ui/core/IconFA';
// import {
//   GET_SITES_IDS,
//   GET_CURRENT_SITES_LIMIT,
// } from '@Shared/graphql/queries';
// import { newApiClient } from '@Clients';
// import { useAccountId, url } from '@Shared';
import useStyles from './styles';
// import { removeItemsWhichIncludes } from './utils';
// import {
//  STORAGE_BUILD_OPTIONS_PREFIX,
//  URL_BUILD_OPTIONS_PARAM,
// } from './consts';

const SubmitSection = ({
  isDeployLoading,
  onDeploy,
  disabled,
  // deployMutationInput,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // const [buildOptionsKey, setBuildOptionsKey] = useState();

  const overrideClass = {
    button: classes.button,
  };
  // const accountId = useAccountId();
  // const {
  //   data: teamBillingData = currentSitesLimitMockup,
  //   loading: teamBillingDataLoading,
  // } = useQuery(GET_CURRENT_SITES_LIMIT, {
  //   variables: { teamId: accountId },
  //   client: newApiClient,
  // });

  // const activePlan = get(
  //   teamBillingData,
  //   'getTeamBillingInformation.activePlan.selectedPlan',
  //   {},
  // );
  // const achievedLimitOfSites = false;

  // const saveBuildOptions = () => {
  //   removeItemsWhichIncludes(STORAGE_BUILD_OPTIONS_PREFIX);
  //   const stringifiedBuildOptions = JSON.stringify(deployMutationInput);
  //   window.localStorage.setItem(buildOptionsKey, stringifiedBuildOptions);
  // };

  // useEffect(() => {
  //   if (achievedLimitOfSites) {
  //     const key = `${STORAGE_BUILD_OPTIONS_PREFIX}-${new Date().getTime()}`;
  //     setBuildOptionsKey(key);
  //   }
  // }, [achievedLimitOfSites]);

  // if (teamBillingDataLoading) {
  //   return (
  //     <GenericButton
  //       overrideClass={overrideClass}
  //       buttonVariant="primary"
  //       textVariant="button"
  //       loading
  //     />
  //   );
  // }

  // if (achievedLimitOfSites) {
  //   return (
  //     <div className={classes.root}>
  //       <Link
  //         to={url.buildUrl(
  //           { [URL_BUILD_OPTIONS_PARAM]: buildOptionsKey },
  //           `/teams/${accountId}/billing/change-plan`,
  //         )}
  //         className={classes.resetLinkStyles}
  //         onClick={saveBuildOptions}
  //       >
  //         <GenericButton
  //           overrideClass={overrideClass}
  //           buttonVariant="primary"
  //           textVariant="button"
  //         >
  //           {t('sites.start.buildOptions.pickPlan')}
  //         </GenericButton>
  //       </Link>
  //       <IconFA
  //         className={classes.icon}
  //         icon={['fal', 'exclamation-triangle']}
  //       />
  //       <Typography variant="subtitle2" color="textSecondary">
  //         {t('sites.start.buildOptions.pickPlanInfo', {
  //           planName: activePlan.name,
  //           sitesLimit: activePlan.limitNumberOfSites,
  //         })}
  //       </Typography>
  //     </div>
  //   );
  // }

  return (
    <GenericButton
      onClick={onDeploy}
      overrideClass={overrideClass}
      buttonVariant="primary"
      textVariant="button"
      disabled={disabled}
      loading={isDeployLoading}
    >
      {t('sites.start.buildOptions.deploySiteMsg')}
    </GenericButton>
  );
};

SubmitSection.propTypes = {
  isDeployLoading: PropTypes.bool.isRequired,
  onDeploy: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  deployMutationInput: PropTypes.shape({
    teamId: PropTypes.string,
    githubRepositoryUrl: PropTypes.string,
    repositoryBranch: PropTypes.string,
    buildCommand: PropTypes.string,
    publishDirectoryPath: PropTypes.string,
    installationId: PropTypes.string,
  }).isRequired,
};

export default SubmitSection;
