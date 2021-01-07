import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { newApiClient } from '@Clients';
import { useQuery } from '@apollo/react-hooks';
import PickPlan from '~/views/Teams/shared/components/PickPlan';
import { GET_PLANS } from '~/views/Teams/Billing/graphql/queries';
import config from '~/config';

const ChoosePlan = ({
  selectPlan,
}) => {
  const { data: plansData } = useQuery(GET_PLANS, {
    client: newApiClient,
  });
  const availablePlans = get(plansData, 'getPlans', []);

  return (
    <PickPlan
      onClickPlan={selectPlan}
      plans={availablePlans}
      currentPlan={{
        id: 'basic_plan',
      }}
      supportEmail={config.supportEmail}
    />
  );
};

ChoosePlan.propTypes = {
  selectPlan: PropTypes.func.isRequired,
};

export default ChoosePlan;
