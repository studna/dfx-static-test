import React from 'react';
import PropTypes from 'prop-types';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Domain from './components/Domain';
import NoDomainFooter from './components/NoDomainFooter';
import Skeleton from './components/Skeleton';
import useStyles from './styles';

const Ens = ({
  ensInfo,
  setEnsControllerOnClick,
  loading,
  siteId,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const getCardContent = () => {
    if (loading) {
      return <Skeleton />;
    }

    if (ensInfo) {
      return (
        <Domain
          siteId={siteId}
          ensInfo={ensInfo}
          setEnsControllerOnClick={setEnsControllerOnClick}
        />
      );
    }

    return <NoDomainFooter />;
  };

  return (
    <CardTitled
      mainContent={t('sites.tabs.settings.ens.ensBox.title')}
      classes={{
        content: classes.cardContent,
      }}
    >
      <Typography className={classes.paragraph}>
        {t('sites.tabs.settings.ens.ensBox.description')}
      </Typography>
      {getCardContent()}
    </CardTitled>
  );
};

Ens.defaultProps = {
  ensInfo: null,
};

Ens.propTypes = {
  ensInfo: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  setEnsControllerOnClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  siteId: PropTypes.string.isRequired,
};

export default Ens;
