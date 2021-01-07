import gql from 'graphql-tag';

import { PLAN_INFO } from '@Shared/graphql/fragments';

const query = gql`
query getPlans{
  getPlans{
    ...PlanInfo
  }
}
${PLAN_INFO}
`;

export default query;
