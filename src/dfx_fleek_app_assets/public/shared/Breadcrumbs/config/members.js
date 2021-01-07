import {
  membersResolver,
  membersDefaultConfig,
} from '../resolvers';


const members = [
  {
    path: '/teams/:teamId/members',
    resolvers: [membersResolver],
    defaultConfig: [membersDefaultConfig],
  },
  {
    path: '/teams/:teamId/members/add',
    resolvers: [membersResolver],
    defaultConfig: [membersDefaultConfig],
  },
];

export default members;
