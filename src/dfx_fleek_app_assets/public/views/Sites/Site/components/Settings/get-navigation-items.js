import getNavItems from '@Shared/Settings/get-navigation-items';

export const SECTION_IDS = {
  BUILD_AND_DEPLOY: 'build-and-deploy',
  DOMAIN_MANAGEMENT: 'domain-management',
  CONTINUOUS_DEPLOYMENT: 'continuous-deployment',
  ADVANCED_BUILD_SETTINGS: 'advanced-build-settings',
  CUSTOM_DOMAINS: 'custom-domains',
  ENS: 'ens',
  TTL: 'ssl',
  GENERAL: 'general',
  SITE_DETAILS: 'site-details',
  DANGER_ZONE: 'danger-zone',
};

export const MAIN_SECTIONS = [
  SECTION_IDS.GENERAL,
  SECTION_IDS.BUILD_AND_DEPLOY,
  SECTION_IDS.DOMAIN_MANAGEMENT,
];

export const SUB_SECTIONS = [
  SECTION_IDS.CUSTOM_DOMAINS,
  SECTION_IDS.ENS,
  SECTION_IDS.TTL,
  SECTION_IDS.CONTINUOUS_DEPLOYMENT,
  SECTION_IDS.ADVANCED_BUILD_SETTINGS,
  SECTION_IDS.SITE_DETAILS,
  SECTION_IDS.DANGER_ZONE,
];

const getNavigationItems = (t, currActiveSubsection) => {
  const rawItems = [
    {
      title: t('siteSettings.sectionTitles.general'),
      id: SECTION_IDS.GENERAL,
      type: 'main',
      list: [
        {
          title: t('siteSettings.sectionTitles.siteDetails'),
          id: SECTION_IDS.SITE_DETAILS,
          type: 'subsection',
        },
        {
          title: t('siteSettings.sectionTitles.dangerZone'),
          id: SECTION_IDS.DANGER_ZONE,
          type: 'subsection',
        },
      ],
    },
    {
      title: t('siteSettings.sectionTitles.buildAndDeploy'),
      id: SECTION_IDS.BUILD_AND_DEPLOY,
      type: 'main',
      list: [
        {
          title: t('siteSettings.sectionTitles.continuousDeployment'),
          id: SECTION_IDS.CONTINUOUS_DEPLOYMENT,
          type: 'subsection',
        },
        {
          title: t('siteSettings.sectionTitles.advancedBuildSettings'),
          id: SECTION_IDS.ADVANCED_BUILD_SETTINGS,
          type: 'subsection',
        },
      ],
    },
    {
      title: t('siteSettings.sectionTitles.domainManagement'),
      id: SECTION_IDS.DOMAIN_MANAGEMENT,
      type: 'main',
      list: [
        {
          title: t('siteSettings.sectionTitles.domains'),
          id: SECTION_IDS.CUSTOM_DOMAINS,
          type: 'subsection',
        },
        {
          title: t('siteSettings.sectionTitles.ens'),
          id: SECTION_IDS.ENS,
          type: 'subsection',
        },
        {
          title: t('siteSettings.sectionTitles.https'),
          id: SECTION_IDS.TTL,
          type: 'subsection',
        },
      ],
    },
  ];
  return getNavItems(currActiveSubsection, rawItems);
};

export default getNavigationItems;
