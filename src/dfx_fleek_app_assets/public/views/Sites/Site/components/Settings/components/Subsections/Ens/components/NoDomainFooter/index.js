import React from 'react';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import { url } from '@Shared';

import useStyles from './styles';

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const match = useRouteMatch();

  return (
    <>
      <a
        href="https://docs.fleek.co/hosting/domain-management/#ens-domains"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.resetAnchorStyles}
      >
        <ArrowLink className={classes.link}>
          {t('sites.tabs.settings.ens.noDomain.learnMore')}
        </ArrowLink>
      </a>
      <Link
        to={url.buildUrl(null, `/sites/${match.params.siteSlug}/add-ens-domain`)}
        className={classes.resetAnchorStyles}
      >
        <GenericButton
          buttonVariant="primary"
          className={classes.button}
        >
          {t('sites.tabs.settings.ens.noDomain.addEns')}
        </GenericButton>
      </Link>
    </>
  );
};

export default Footer;
