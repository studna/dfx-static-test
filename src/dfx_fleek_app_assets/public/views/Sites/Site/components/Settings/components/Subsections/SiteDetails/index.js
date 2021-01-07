import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import CardTitled from '@terminal-packages/ui/core/CardTitled';
import StripedList from '@terminal-packages/ui/core/StripedList';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import ChangeSiteNameModal from '@Shared/modals/ChangeSiteName';

import useStyles from './styles';
import presenter from '../../../../Overview/presenter';

const SiteDetails = ({
  i18n,
  siteBySlug,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showChangeNameModal, setChangeNameModal] = React.useState(false);

  const details = presenter.getSiteDetails({ t, siteBySlug });

  return (
    <>
      {
        showChangeNameModal && (
          <ChangeSiteNameModal
            open
            siteBySlug={siteBySlug}
            onClose={() => setChangeNameModal(false)}
          />
        )
      }
      <CardTitled
        mainContent={i18n.title}
        classes={{
          content: classes.sectionContent,
        }}
      >
        <StripedList>
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className={classes.textContainer}>
              <Typography variant="body2">
                {`${t(`sites.overview.${key}`)}:`}
              </Typography>
              <Typography noWrap variant="body2" className={classes.secondColumn}>
                {value}
              </Typography>
            </div>
          ))}
        </StripedList>
        <div className={classes.buttonContainer}>
          <GenericButton
            buttonVariant="secondary"
            onClick={() => setChangeNameModal(true)}
          >
            {t('siteSettings.general.siteDetails.changeName')}
          </GenericButton>
        </div>
      </CardTitled>
    </>
  );
};

SiteDetails.propTypes = {
  i18n: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  siteBySlug: PropTypes.shape({}).isRequired,
};

export default SiteDetails;
