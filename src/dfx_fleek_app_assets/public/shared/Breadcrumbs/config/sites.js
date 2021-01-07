import {
  billingResolver,
  billingDefaultConfig,
  rootSiteResolver,
  rootSitesDefaultConfig,
  siteResolver,
  sitesDefaultConfig,
} from '../resolvers';


const sites = [
  {
    path: '/teams/:teamId/sites',
    resolvers: [rootSiteResolver],
    defaultConfig: [rootSitesDefaultConfig],
  },
  {
    path: '/teams/:teamId/billing/*',
    resolvers: [billingResolver],
    defaultConfig: [billingDefaultConfig],
  },
  {
    path: '/sites/*',
    resolvers: [rootSiteResolver, siteResolver],
    defaultConfig: [
      rootSitesDefaultConfig,
      sitesDefaultConfig,
    ],
  },
];

export default sites;
