import getNavItems from '@Shared/Settings/get-navigation-items';

import { SECTION_IDS, SECTION_TYPES } from './constants';

const getItems = ({
  t,
  section,
}) => (
  getNavItems(section, [
    {
      title: t('accountSettings.navs.general'),
      id: SECTION_IDS.GENERAL,
      type: SECTION_TYPES.MAIN,
      list: [
        {
          title: t('accountSettings.navs.profile'),
          id: SECTION_IDS.PROFILE,
          type: SECTION_TYPES.SUBSECTION,
        },
        {
          title: t('accountSettings.navs.api'),
          id: SECTION_IDS.API,
          type: SECTION_TYPES.SUBSECTION,
        },
      ],
    },
  ])
);

export default {
  getItems,
};
