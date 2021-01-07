import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import useStyles from './styles';

const AddEnsDescription = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Typography className={classes.title}>
        {t('sites.tabs.settings.ens.addEns.title')}
      </Typography>
      <Typography className={classes.description}>
        {t('sites.tabs.settings.ens.addEns.description')}
      </Typography>
      <a
        href="https://docs.fleek.co/hosting/domain-management/#ens-domains"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.resetAnchorStyles}
      >
        <ArrowLink className={classes.link}>
          {t('sites.tabs.settings.ens.addEns.learnMore')}
        </ArrowLink>
      </a>
    </>
  );
};

export default AddEnsDescription;
