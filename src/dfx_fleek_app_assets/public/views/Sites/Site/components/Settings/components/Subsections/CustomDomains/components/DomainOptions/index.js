import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


import Spinner from '@terminal-packages/ui/core/Spinner';
import { toast } from '@terminal-packages/ui/core/Toast';
import ListItem from '@terminal-packages/ui/core/ListItem';
import MenuDropdown from '@terminal-packages/ui/core/MenuDropdown';

import { newApiClient } from '@Clients';
import { REMOVE_CUSTOM_DOMAIN } from '@Shared/graphql/mutations';
import {
  openModal,
  DNS_LINK_MODAL,
} from '@Shared/modals/actions';

import { GET_SITE_BY_SLUG } from '../../../../../../../../graphql/queries';

import useStyles from './styles';
import { getDnsLink } from '../../utils';

const DomainOptions = ({
  domain,
  siteId,
  domainId,
  dnsLinkVerified,
  defaultDomain,
  isTerminalDNS,
}) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    isLoading: false,
    isOptionsOpen: false,
  });

  const [deleteCustomDomain] = useMutation(REMOVE_CUSTOM_DOMAIN, {
    client: newApiClient,
    update: (cache) => {
      try {
        const data = cache.readQuery({
          query: GET_SITE_BY_SLUG,
          variables: {
            slug: match.params.siteSlug,
          },
        });

        const domains = data.getSiteBySlug.domains.filter((_domain) => (
          _domain.domainId !== domainId
        ));

        cache.writeQuery({
          query: GET_SITE_BY_SLUG,
          variables: {
            slug: match.params.siteSlug,
          },
          data: {
            ...data,
            getSiteBySlug: {
              ...data.getSiteBySlug,
              domains,
            },
          },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error when trying to update GET_SITE_BY_SLUG query: ', error.message);
      }
    },
  });

  const handleRemoveDomain = async (event) => {
    event.preventDefault();

    setState({
      ...state,
      isLoading: true,
    });

    try {
      await deleteCustomDomain({
        variables: {
          input: {
            siteId,
            domainId,
          },
        },
      });

      toast.success(
        t('sites.tabs.settings.customDomains.success'),
        { autoClose: 6000 },
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error when trying to remove a custom domain: ', error.message);

      toast.error(
        t('sites.tabs.settings.customDomains.error'),
        { autoClose: 6000 },
      );
    }
  };

  const openDNSLinkModal = () => dispatch(openModal(
    DNS_LINK_MODAL,
    {
      siteId,
      domainId,
      currentDomain: domain,
      domain: defaultDomain,
    },
  ));

  return (
    <div className={classes.optionsContainer}>
      {
        !isTerminalDNS && (
          <MenuDropdown
            menuId="menu-dropdown-domain-options"
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
            <ListItem>
              {dnsLinkVerified ? (
                <a
                  href={getDnsLink(domain)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.resetLinkStyles}
                >
                  <Typography variant="subtitle1" className={classes.linkText}>
                    {t('sites.tabs.settings.customDomains.dnsLinkVerified')}
                  </Typography>
                </a>
              ) : (
                <ButtonBase
                  type="button"
                  className={classes.buttonBase}
                  onClick={openDNSLinkModal}
                >
                  <Typography variant="subtitle1">
                    {t('sites.tabs.settings.customDomains.dnsLink')}
                  </Typography>
                </ButtonBase>
              )}
            </ListItem>
            <ListItem className={classes.domainOption}>
              <ButtonBase
                type="button"
                className={classes.buttonBase}
                onClick={handleRemoveDomain}
              >
                <Typography variant="subtitle1" className={classes.remove}>
                  {t('sites.tabs.settings.customDomains.remove')}
                  {
                    state.isLoading && (
                      <span className={classes.spinner}>
                        <Spinner positioning="inline" />
                      </span>
                    )
                  }
                </Typography>
              </ButtonBase>
            </ListItem>
          </MenuDropdown>
        )
      }
    </div>
  );
};

DomainOptions.defaultProps = {
  domain: '',
  defaultDomain: null,
};

DomainOptions.propTypes = {
  domain: PropTypes.string,
  defaultDomain: PropTypes.string,
  dnsLinkVerified: PropTypes.bool.isRequired,
  siteId: PropTypes.string.isRequired,
  domainId: PropTypes.string.isRequired,
  isTerminalDNS: PropTypes.bool.isRequired,
};

export default DomainOptions;
