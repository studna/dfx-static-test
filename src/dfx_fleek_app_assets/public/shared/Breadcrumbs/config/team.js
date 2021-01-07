import {
  teamResolver,
  teamDefaultConfig,
} from '../resolvers';


const members = [
  {
    path: '/teams/create*',
    resolvers: [teamResolver],
    defaultConfig: [teamDefaultConfig],
  },
];

export default members;
