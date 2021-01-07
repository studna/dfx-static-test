import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';
import { Link, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { url } from '@Shared';
import { GET_ENS_DOMAIN_INFO } from '@Shared/graphql/queries';
import { newApiClient } from '@Clients';
import getEthereumInfo from '@Shared/web3/get-ethereum-info';
import { SECTION_IDS } from '../../../Site/components/Settings/get-navigation-items';
import { STEPS } from '../../container/AddEnsDomainForm/constants';
import useStyles from './styles';

const VerifyButtons = ({
  state,
  setState,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const match = useRouteMatch();

  const isDomainValid = (domain) => {
    const trimmedDomain = domain.trim();
    const isValid = /^([\w-]+.)+eth$/.test(trimmedDomain);

    return isValid;
  };

  const handleVerify = async () => {
    setState({
      ...state,
      loading: true,
    });

    const trimmedDomain = state.domain.trim();

    try {
      const ethereumInfo = getEthereumInfo();
      const { data: { getEnsDomainInfo: ensDomainData } } = await newApiClient.query({
        query: GET_ENS_DOMAIN_INFO,
        variables: {
          domain: trimmedDomain,
          network: ethereumInfo.network,
        },
        fetchPolicy: 'network-only',
      });


      if (!ensDomainData.ownerAddress) {
        setState({
          ...state,
          domain: trimmedDomain,
          step: STEPS.BUY_A_DOMAIN,
          loading: false,
          ensDomainInfo: ensDomainData,
        });

        return;
      }

      setState({
        ...state,
        domain: trimmedDomain,
        loading: false,
        step: STEPS.ALREADY_HAS_OWNER,
        ensDomainInfo: ensDomainData,
      });
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
      setState({
        ...state,
        loading: false,
      });
    }
  };

  return (
    <div>
      <GenericButton
        loading={state.loading}
        disabled={!isDomainValid(state.domain)}
        onClick={handleVerify}
        buttonVariant="primary"
        className={classes.button}
      >
        <Typography variant="body2">
          {t('common.verify')}
        </Typography>
      </GenericButton>
      <Link
        to={url.buildUrl(null, `/sites/${match.params.siteSlug}/settings/${SECTION_IDS.ENS}`)}
        className={classes.link}
      >
        <GenericButton
          buttonVariant="secondary"
        >
          <Typography variant="body2">
            {t('common.cancel')}
          </Typography>
        </GenericButton>
      </Link>
    </div>
  );
};

VerifyButtons.propTypes = {
  state: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default VerifyButtons;
