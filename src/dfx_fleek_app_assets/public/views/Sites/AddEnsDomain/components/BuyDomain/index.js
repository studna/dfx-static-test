import React, { useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import getEthereumInfo from '@Shared/web3/get-ethereum-info';
import { GET_ENS_DOMAIN_INFO } from '@Shared/graphql/queries';
import { newApiClient } from '@Clients';

import useStyles from './styles';

const BuyDomain = ({
  state,
  setState,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const ethereumInfo = getEthereumInfo();

  const { data, startPolling, stopPolling } = useQuery(GET_ENS_DOMAIN_INFO, {
    client: newApiClient,
    variables: {
      network: ethereumInfo.network,
      domain: state.domain,
    },
  });

  const ownerAddress = get(data, 'getEnsDomainInfo.ownerAddress');

  useEffect(() => {
    startPolling(3000);
    return () => stopPolling();
  });

  useEffect(() => {
    if (ownerAddress) {
      setState({
        ...state,
        ensDomainInfo: data.getEnsDomainInfo,
      });
      stopPolling();
    }
  }, [ownerAddress]);

  return (
    <>
      <Typography className={classes.title}>
        {t('sites.tabs.settings.ens.addEns.isAvailable', {
          domain: state.domain,
        })}
      </Typography>
      <Typography className={classes.subTitle}>
        {t('sites.tabs.settings.ens.addEns.wouldYouLike')}
      </Typography>
      <Typography className={classes.description}>
        {t('sites.tabs.settings.ens.addEns.byClicking')}
      </Typography>
      <a
        href={`https://app.ens.domains/name/${state.domain}`}
        className={classes.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GenericButton
          buttonVariant="primary"
        >
          <Typography variant="body2">
            {t('sites.tabs.settings.ens.addEns.buyDomain', {
              domain: state.domain,
            })}
          </Typography>
        </GenericButton>
      </a>
    </>
  );
};

BuyDomain.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    ensDomainInfo: PropTypes.shape({
      ownerAddress: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default BuyDomain;
