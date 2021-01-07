import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { url } from '@Shared';
import {
  Route,
  Switch,
  matchPath,
  useRouteMatch,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';
import useAccountId from '@Shared/hooks/useAccountId';
import { useDispatch } from 'react-redux';
import { newApiClient } from '@Clients';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GoBackLink from '@Shared/Layout/components/GoBackLink';
import Box from '@terminal-packages/ui/core/Box';
import Stepper from '@terminal-packages/ui/core/Stepper/Stepper';
import get from 'lodash/get';

import GET_TEAM_BILLING_INFORMATION from '@Shared/graphql/queries/get-team-billing-information';
import { openModal, PAYMENT_METHOD_MODAL } from '@Shared/modals/actions';
import PickPlan from '~/views/Teams/shared/components/PickPlan';
import PaymentSummary from '~/views/Teams/shared/components/PaymentSummary';
import config from '~/config';
// import useOnUpdatePlanCallback from '../hooks/use-on-update-plan-callback';

import { GET_PLANS } from '../../../graphql/queries';
import UPDATE_TEAM_PLAN from '../../../graphql/mutations/update-team-plan';

import { GA_EVENTS_CATEGORIES } from '~/constants';

const PICK_PLAN_URL = '/pick-plan';
const SUMMARY_URL = '/summary/:planId';

const ChangePlanForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();
  const teamId = useAccountId();

  const { data: plans, loading: plansLoading } = useQuery(
    GET_PLANS, {
      client: newApiClient,
    },
  );

  const {
    refetch,
    data: billingInfoData,
  } = useQuery(GET_TEAM_BILLING_INFORMATION, {
    client: newApiClient,
    variables: {
      teamId,
    },
  });

  const stepPaths = [
    `${match.url}${PICK_PLAN_URL}`,
    `${match.url}${SUMMARY_URL}`,
  ];
  const indexOfActiveStep = stepPaths.findIndex(
    (path) => matchPath(location.pathname, { path, exact: true }),
  );

  const handleBackButton = () => {
    let newUrl;
    // eslint-disable-next-line default-case
    switch (indexOfActiveStep) {
      case 0: {
        newUrl = `/teams/${teamId}/billing/general`;
        break;
      }
      case 1: {
        newUrl = `${match.url}${PICK_PLAN_URL}`;
        break;
      }
    }

    history.push(url.buildUrl(null, newUrl));
  };

  const stepTitles = [
    t('billing.changePlan.stepper.step1'),
    t('billing.changePlan.stepper.step2'),
  ];

  const onCompletedUpdatePlan = () => {
    history.push(
      url.buildUrl(
        null,
        `/teams/${teamId}/billing/general`,
        ['buildOptionsKey'],
      ),
    );
  };

  const summaryMatch = matchPath(location.pathname, {
    path: `${match.url}${SUMMARY_URL}`,
    exact: true,
  });

  const [onUpdatePlan, { loading = true }] = useMutation(UPDATE_TEAM_PLAN, {
    client: newApiClient,
    variables: {
      input: {
        teamId,
        planId: get(summaryMatch, 'params.planId'),
      },
    },
    onCompleted: onCompletedUpdatePlan,
    // TODO: when limit of sites will come back then use -> onUpdatePlanCallback,
  });

  const availablePlans = get(plans, 'getPlans', []);
  const currentPlan = get(billingInfoData, 'getTeamBillingInformation.activePlan.selectedPlan', {});
  const paymentMethod = get(billingInfoData, 'getTeamBillingInformation.paymentMethod', {});

  const newCreditCardAction = () => {
    window.ga('send', 'event', GA_EVENTS_CATEGORIES.BILLING, 'Add payment method');
    window.analytics.track('Add payment method', {
      teamId,
    });

    return dispatch(openModal(PAYMENT_METHOD_MODAL, {
      onSuccess: refetch,
    }));
  };

  const selectedPlanId = get(summaryMatch, 'params.planId');
  const selectedPlan = availablePlans.find(({ id }) => id === selectedPlanId);

  const handleUpdatePlan = () => {
    window.ga('send', 'event', GA_EVENTS_CATEGORIES.BILLING, 'Update Team Plan', selectedPlanId);
    window.analytics.track('Update Team Plan', {
      teamId,
      selectedPlanId,
    });

    onUpdatePlan();
  };

  useEffect(() => {
    const isInvalidPlanId = !selectedPlan && !plansLoading;
    if (summaryMatch && isInvalidPlanId) {
      handleBackButton();
    }
  }, [summaryMatch, plansLoading]);

  return (
    <div>
      <GoBackLink
        buttonText={t('billing.changePlan.back')}
        onClick={handleBackButton}
      />
      <Box
        padding="37px 57px 34px 57px"
      >
        <Stepper
          title={t('billing.changePlan.stepper.title')}
          description={t('billing.changePlan.stepper.description')}
          stepTitles={stepTitles}
          indexOfActiveStep={indexOfActiveStep}
        >
          <Switch>
            <Route path={`${match.url}${PICK_PLAN_URL}`} exact>
              <PickPlan
                onClickPlan={({ plan }) => {
                  window.ga('send', 'event', GA_EVENTS_CATEGORIES.BILLING, 'Pick plan', currentPlan.id);
                  window.analytics.track('Pick plan', {
                    teamId,
                    pickedPlanId: plan.id,
                    currentPlanId: currentPlan.id,
                  });

                  history.push(url.buildUrl(null, `${match.url}/summary/${plan.id}`));
                }}
                plans={availablePlans}
                currentPlan={currentPlan}
                supportEmail={config.supportEmail}
              />
            </Route>
            <Route path={`${match.url}${SUMMARY_URL}`} exact>
              {selectedPlan ? (
                <PaymentSummary
                  selectedPlan={selectedPlan}
                  creditCardFourLastDigits={get(paymentMethod, 'card.lastCardNumbers', '')}
                  creditCardType={get(paymentMethod, 'issuer')}
                  newCreditCardAction={newCreditCardAction}
                  onSubmit={handleUpdatePlan}
                  loading={loading}
                />
              ) : null}
            </Route>
            <Redirect to={url.buildUrl(null, `${match.url}${PICK_PLAN_URL}`)} />
          </Switch>
        </Stepper>
      </Box>
    </div>
  );
};

export default ChangePlanForm;
