import gql from 'graphql-tag';

import { TEAM_INFO } from '../fragments';

export default gql`
  query getTeamById($id: ID!) {
    getTeamById(id: $id) {
      ...TeamInfo
    }
  }
  ${TEAM_INFO}
`;
