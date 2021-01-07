const ATTRIBUTES = {
  numberOfSites: 'Number of sites',
  customDomain: 'Custom domain',
  plan: 'Plan',
  platform: 'Platform',
  numberOfDeploys: 'Number of deploys',
  linkedGithub: 'Linked GitHub',
  numberOfCustomDomains: 'Number of custom domains',
  numberOfTeams: 'Number of teams',
  customSSL: 'Custom SSL',
  numberOfSiteVisits: 'Number of site visits',
  activePlan: 'Active plan',
  lastDeploy: 'Last deploy',
  teamNames: 'Team names',
  siteNames: 'Site names',
  totalPaymentAmount: 'Total payment amount',
  hasSites: 'Has sites',
};

const getIntercomAttributes = ({ hasSites }) => ({
  [ATTRIBUTES.hasSites]: hasSites,
});

export default getIntercomAttributes;
