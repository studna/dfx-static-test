import React, { useEffect } from 'react';
import {
  Route,
  Switch,
  matchPath,
  useRouteMatch,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import Box from '@terminal-packages/ui/core/Box';
import { newApiClient } from '@Clients';
import GoBackLink from '@Shared/Layout/components/GoBackLink';
import Stepper from '@terminal-packages/ui/core/Stepper/Stepper';
import { url } from '@Shared';
import useAccountId from '@Shared/hooks/useAccountId';
import { GET_PLANS } from '~/views/Teams/Billing/graphql/queries';

import { TeamNameForm, ChoosePlan, Summary } from './components';

const TEAM_NAME_URL = '/team-name';
const PICK_PLAN_URL = '/pick-plan/:teamName';
const SUMMARY_URL = '/summary/:teamName/:planId';

const CreateTeam = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const match = useRouteMatch();
  const location = useLocation();
  const teamId = useAccountId();
  const getPlansResponse = useQuery(GET_PLANS, { client: newApiClient });
  const stepPaths = [
    `${match.url}${TEAM_NAME_URL}`,
    `${match.url}${PICK_PLAN_URL}`,
    `${match.url}${SUMMARY_URL}`,
  ];

  const indexOfCurrentStep = stepPaths.findIndex(
    (path) => matchPath(location.pathname, { path, exact: true }),
  );

  const handleBackButton = () => {
    let newUrl;
    // eslint-disable-next-line default-case
    switch (indexOfCurrentStep) {
      case 0: {
        newUrl = `/teams/${teamId}/sites`;
        break;
      }
      case 1: {
        newUrl = `${match.url}${TEAM_NAME_URL}`;
        break;
      }
      case 2: {
        const { params } = matchPath(location.pathname, {
          path: `${match.url}${SUMMARY_URL}`,
          exact: true,
        });
        newUrl = `${match.url}/pick-plan/${params.teamName}`;
        break;
      }
    }

    history.push(url.buildUrl(null, newUrl));
  };

  const stepTitles = [
    t('team.create.stepper.step1.title'),
    t('team.create.stepper.step2.title'),
    t('team.create.stepper.step3.title'),
  ];

  const summaryMatch = matchPath(location.pathname, {
    path: `${match.url}${SUMMARY_URL}`,
    exact: true,
  });
  const selectedPlanId = get(summaryMatch, 'params.planId');
  const plans = get(getPlansResponse, 'data.getPlans', []);
  const selectedPlan = plans.find(({ id }) => id === selectedPlanId);

  useEffect(() => {
    const isInvalidPlanId = !selectedPlan && !getPlansResponse.loading;
    if (summaryMatch && isInvalidPlanId) {
      handleBackButton();
    }
  }, [summaryMatch, getPlansResponse.loading]);

  const getSummaryComponent = () => {
    if (selectedPlan) {
      return (
        <Summary
          teamName={summaryMatch.params.teamName}
          selectedPlan={selectedPlan}
        />
      );
    }

    return null;
  };

  const onSelectPlan = ({ plan }) => {
    const { params } = matchPath(location.pathname, {
      path: `${match.url}${PICK_PLAN_URL}`,
      exact: true,
    });
    history.push(url.buildUrl(
      null,
      `${match.url}/summary/${params.teamName}/${plan.id}`,
    ));
  };

  return (
    <>
      <GoBackLink onClick={handleBackButton} />
      <Box padding="37px 57px 42px">
        <Stepper
          title={t('team.create.stepper.title')}
          description={t('team.create.stepper.description')}
          stepTitles={stepTitles}
          indexOfActiveStep={indexOfCurrentStep}
        >
          <Switch>
            <Route path={`${match.url}${TEAM_NAME_URL}`} exact>
              <TeamNameForm
                setTeamName={(newTeamName) => {
                  history.push(url.buildUrl(null, `${match.url}/pick-plan/${newTeamName}`));
                }}
              />
            </Route>
            <Route path={`${match.url}${PICK_PLAN_URL}`} exact>
              <ChoosePlan
                selectPlan={onSelectPlan}
              />
            </Route>
            <Route path={`${match.url}${SUMMARY_URL}`} exact>
              {getSummaryComponent()}
            </Route>
            <Redirect to={url.buildUrl(null, `${match.url}${TEAM_NAME_URL}`)} />
          </Switch>
        </Stepper>
      </Box>
    </>
  );
};

export default CreateTeam;
