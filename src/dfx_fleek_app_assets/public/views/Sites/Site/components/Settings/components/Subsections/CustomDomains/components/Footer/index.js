import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRouteMatch, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { url } from '@Shared';
import IconFA from '@terminal-packages/ui/core/IconFA';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { GA_EVENTS_CATEGORIES } from '~/constants';

import useStyles from './styles';

const LINK_DESTINATINATION_REDIRECT = 'https://docs.fleek.co/hosting/site-deployment/#monitoring-a-deployment';
const LINK_DESTINATINATION_DOMAINS = 'https://docs.fleek.co/hosting/domain-management/#custom-domains';

const CustomDomainsFooter = ({
  siteId,
  domainsLength,
  hasWaitingDomain,
}) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const { t } = useTranslation();

  const showRedirectLink = domainsLength > 1 && hasWaitingDomain;
  const showLink = domainsLength <= 1 || showRedirectLink;
  const to = url.buildUrl(null, `/sites/${match.params.siteSlug}/add-domain`);

  const linkText = showRedirectLink
    ? t('sites.tabs.settings.customDomains.learnAboutRedirect')
    : t('sites.tabs.settings.customDomains.learnAboutCustomDomains');

  const linkDestination = showRedirectLink
    ? LINK_DESTINATINATION_REDIRECT
    : LINK_DESTINATINATION_DOMAINS;

  return (
    <div className={classes.footer}>
      {
        showLink && (
          <div>
            <a
              href={linkDestination}
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="body2" className={classes.docs}>
                {linkText}
              </Typography>
              <IconFA
                className={classes.arrowIcon}
                icon={['fal', 'long-arrow-right']}
                size="inherit"
              />
            </a>
          </div>
        )
      }
      {
        domainsLength <= 1 && (
          <div className={classes.button}>
            <Link
              to={to}
              className={classes.linkStyleReset}
            >
              <GenericButton
                buttonVariant="primary"
                className={classes.button}
                onClick={() => {
                  window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Add custom domain from domain management settings');
                  window.analytics.track('Add custom domain from domain management settings', {
                    siteId,
                    teamId: url.getAccountIdFromUrl(),
                  });
                }}
              >
                {t('sites.tabs.settings.customDomains.buttonText')}
              </GenericButton>
            </Link>
          </div>
        )
      }
    </div>
  );
};

CustomDomainsFooter.propTypes = {
  siteId: PropTypes.string.isRequired,
  domainsLength: PropTypes.number.isRequired,
  hasWaitingDomain: PropTypes.bool.isRequired,
};

export default CustomDomainsFooter;
