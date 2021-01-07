import getNavItems from '@Shared/Settings/get-navigation-items';

export const SECTION_IDS = {
  GENERAL: 'general',
  PLAN_DETAILS: 'plan-details',
  INVOICES: 'invoices',
  BILLING_DETAILS: 'billing-details',
};

export const MAIN_SECTIONS = [
  SECTION_IDS.GENERAL,
];

export const SUB_SECTIONS = [
  SECTION_IDS.PLAN_DETAILS,
  // SECTION_IDS.INVOICES,
  SECTION_IDS.BILLING_DETAILS,
];

const getNavigationItems = (t, currActiveSubsection) => {
  const rawItems = [
    {
      title: t('billing.billingSettings.sectionTitles.general'),
      id: SECTION_IDS.GENERAL,
      type: 'main',
      list: [
        {
          title: t('billing.billingSettings.sectionTitles.planDetails'),
          id: SECTION_IDS.PLAN_DETAILS,
          type: 'subsection',
        },
        // {
        //   title: t('billing.billingSettings.sectionTitles.invoices'),
        //   id: SECTION_IDS.INVOICES,
        //   type: 'subsection',
        // },
        {
          title: t('billing.billingSettings.sectionTitles.billingDetails'),
          id: SECTION_IDS.BILLING_DETAILS,
          type: 'subsection',
        },
      ],
    },
  ];
  return getNavItems(currActiveSubsection, rawItems);
};

export default getNavigationItems;
