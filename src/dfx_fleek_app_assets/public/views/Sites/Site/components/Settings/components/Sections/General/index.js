import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import DeleteSiteModal from '@Shared/modals/DeleteSite';

import useStyles from '../shared-styles';
import { SiteDetails, DangerZone } from '../../Subsections';
import { SECTION_IDS } from '../../../get-navigation-items';

const General = ({
  siteBySlug,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showDeleteModal, setDeleteModal] = useState(false);

  return (
    <>
      {
        showDeleteModal && (
          <DeleteSiteModal
            open
            siteBySlug={siteBySlug}
            onClose={() => setDeleteModal(false)}
          />
        )
      }
      <Element name={SECTION_IDS.GENERAL} />
      <Element name={SECTION_IDS.SITE_DETAILS} />
      <div className={classes.header}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('siteSettings.sectionTitles.siteDetails')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('siteSettings.general.siteDetails.subtitle')}
        </Typography>
      </div>
      <SiteDetails
        siteBySlug={siteBySlug}
        i18n={{
          title: t('siteSettings.general.siteDetails.title'),
          siteName: t('siteSettings.general.siteDetails.siteName'),
          owner: t('siteSettings.general.siteDetails.owner'),
          siteId: t('siteSettings.general.siteDetails.siteId'),
          created: t('siteSettings.general.siteDetails.created'),
          lastUpdate: t('siteSettings.general.siteDetails.lastUpdate'),
        }}
      />
      <hr className={classes.spaceBetweenSections} />
      <Element name={SECTION_IDS.DANGER_ZONE} />
      <div className={classes.header}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('siteSettings.sectionTitles.dangerZone')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('siteSettings.general.dangerZone.subtitle')}
        </Typography>
      </div>
      <DangerZone
        onDeleteSite={() => setDeleteModal(true)}
        i18n={{
          title: t('siteSettings.general.dangerZone.title'),
          content: t('siteSettings.general.dangerZone.content'),
          deleteSite: t('siteSettings.general.dangerZone.deleteSite'),
        }}
      />
    </>
  );
};

General.defaultProps = {
  siteBySlug: {},
};

General.propTypes = {
  siteBySlug: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,
  }),
};

export default General;
