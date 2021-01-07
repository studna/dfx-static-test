import gql from 'graphql-tag';

import { TEAM_INFO } from '@Shared/graphql/fragments';

const query = gql`
  mutation updateTeamPlan ($input: UpdateTeamPlanInput){
    updateTeamPlan(input: $input) {
      ...TeamInfo
    }
  }
  ${TEAM_INFO}
`;

export default query;
