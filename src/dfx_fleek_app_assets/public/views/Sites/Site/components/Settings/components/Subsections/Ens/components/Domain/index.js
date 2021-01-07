import React, { useState } from 'react';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useTranslation } from 'react-i18next';
import Spinner from '@terminal-packages/ui/core/Spinner';
import ListItem from '@terminal-packages/ui/core/ListItem';
import MenuDropdown from '@terminal-packages/ui/core/MenuDropdown';
import Chip from '@terminal-packages/ui/core/Chip';
import IconFA from '@terminal-packages/ui/core/IconFA';
import { newApiClient } from '@Clients';
import { useMutation } from '@apollo/react-hooks';
import REMOVE_SITE_ENS_DOMAIN from '@Shared/graphql/mutations/remove-site-ens-domain';

import { DOMAIN_STATES } from '../../constants';
import useStyles from './styles';

const Domain = ({
  ensInfo,
  setEnsControllerOnClick,
  siteId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { domain, verificationStatus } = ensInfo;

  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const [removeSiteEnsDomain] = useMutation(REMOVE_SITE_ENS_DOMAIN, {
    client: newApiClient,
  });

  const domainUrl = verificationStatus === DOMAIN_STATES.ACTIVE
    ? `https://${domain}/`
    : null;

  const handleRemoveDomain = async (event) => {
    event.preventDefault();

    setIsRemoveLoading(true);
    try {
      await removeSiteEnsDomain({
        variables: {
          input: {
            siteId,
          },
        },
      });
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
    }
    setIsRemoveLoading(false);
  };

  const getDomainStatus = () => {
    const addOns = {
      [DOMAIN_STATES.NOT_VERIFED]: (
        <div className={classes.notVerifiedStatus}>
          <div
            tabIndex={0}
            role="button"
            className={classes.warningWrapper}
            onClick={setEnsControllerOnClick}
            onKeyDown={setEnsControllerOnClick}
          >
            <div className={classes.warningIcon}>
              <IconFA
                icon={['fas', 'exclamation-triangle']}
                fontSize="inherit"
                color="inherit"
              />
            </div>
            <Typography className={classes.check}>
              {t('sites.tabs.settings.ens.domainRow.setFleek')}
            </Typography>
          </div>
        </div>
      ),
      [DOMAIN_STATES.PENDING]: (
        <div className={classes.verifiedStatus}>
          <div className={classes.pendingChip}>
            <Chip
              text={t('sites.tabs.settings.ens.domainRow.pending')}
              color="yellow"
            />
          </div>
          <Chip
            text={t('sites.tabs.settings.ens.domainRow.fleekController')}
            color="blue"
          />
        </div>
      ),
      [DOMAIN_STATES.VERIFIED]: (
        <div className={classes.verifiedStatus}>
          <Chip
            text={t('sites.tabs.settings.ens.domainRow.fleekController')}
            color="blue"
          />
        </div>
      ),
    };

    return (
      <div className={classes.domainStatus}>
        {addOns[verificationStatus] || null}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.domainInfo}>
        <Typography
          variant="body2"
        >
          <a
            href={domainUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={classnames(classes.domainLink, {
              [classes.activeText]: verificationStatus === DOMAIN_STATES.ACTIVE,
              [classes.inactiveText]: verificationStatus !== DOMAIN_STATES.ACTIVE,
            })}
          >
            {domain}
          </a>
        </Typography>
        <Typography className={classes.description}>
          {t('sites.tabs.settings.ens.domainRow.ensDomain')}
        </Typography>
      </div>
      {getDomainStatus()}
      <div className={classes.optionsContainer}>
        <MenuDropdown
          menuId="menu-dropdown-ens-domain-options"
          trigger={(
            <IconButton
              disableRipple
              disableFocusRipple
              classes={{
                root: classes.iconButtonRoot,
              }}
            >
              <MoreVert />
            </IconButton>
          )}
        >
          <ListItem className={classes.domainOption}>
            <ButtonBase
              type="button"
              className={classes.buttonBase}
              onClick={handleRemoveDomain}
            >
              <Typography variant="subtitle1" className={classes.remove}>
                {t('sites.tabs.settings.ens.domainRow.remove')}
                {
                  isRemoveLoading && (
                    <span className={classes.spinner}>
                      <Spinner positioning="inline" />
                    </span>
                  )
                }
              </Typography>
            </ButtonBase>
          </ListItem>
        </MenuDropdown>
      </div>
    </div>
  );
};

Domain.propTypes = {
  ensInfo: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    verificationStatus: PropTypes.string.isRequired,
  }).isRequired,
  setEnsControllerOnClick: PropTypes.func.isRequired,
  siteId: PropTypes.string.isRequired,
};

export default Domain;
