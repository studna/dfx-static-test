import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import { url } from '@Shared';
import useStyles from './styles';
import { DOMAIN_TYPE, DOMAIN_STATUS } from '~/constants';

const DomainInfo = ({
  type,
  domain,
  status,
  siteId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.domainInfo}>
      {
        status === DOMAIN_STATUS.PROPAGATED
          ? (
            <Typography
              variant="body2"
            >
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className={classnames(classes.domainText, classes.activeText)}
                onClick={() => {
                  if (type !== DOMAIN_TYPE.DEFAULT_SUBDOMAIN) {
                    window.analytics.track('Propagated added custom domain click', {
                      siteId,
                      domain,
                      teamId: url.getAccountIdFromUrl(),
                    });
                  }
                }}
              >
                {domain}
              </a>
            </Typography>
          )
          : (
            <Typography
              variant="body2"
              className={classnames(classes.domainText, classes.inactiveText)}
            >
              {domain}
            </Typography>
          )
        }
      <Typography className={classes.typeText}>
        {t(`sites.tabs.settings.customDomains.types.${type}`, '')}
      </Typography>
    </div>
  );
};

DomainInfo.propTypes = {
  type: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default DomainInfo;
