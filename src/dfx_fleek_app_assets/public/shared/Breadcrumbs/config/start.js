import {
  rootSiteResolver,
  rootSitesDefaultConfig,
} from '../resolvers';


const start = [
  {
    path: '/start*',
    resolvers: [rootSiteResolver],
    defaultConfig: [rootSitesDefaultConfig],
  },
];

export default start;
