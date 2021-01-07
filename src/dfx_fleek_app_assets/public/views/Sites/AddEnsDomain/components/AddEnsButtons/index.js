import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { url } from '@Shared/utils';
import { newApiClient } from '@Clients';
import SET_SITE_ENS_DOMAIN from '@Shared/graphql/mutations/set-site-ens-domain';
import getEthereumInfo from '@Shared/web3/get-ethereum-info';
import { SECTION_IDS } from '../../../Site/components/Settings/get-navigation-items';
import { STEPS } from '../../container/AddEnsDomainForm/constants';
import useStyles from './styles';

const VerifyButtons = ({
  state,
  setState,
  siteId,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();

  const [setSiteEnsDomain] = useMutation(SET_SITE_ENS_DOMAIN, {
    client: newApiClient,
  });

  const handleAddDomain = async () => {
    setState({
      ...state,
      loading: true,
    });

    const ethereumInfo = getEthereumInfo();
    try {
      await setSiteEnsDomain({
        variables: {
          input: {
            siteId,
            domain: state.domain,
            ownerAddress: state.ensDomainInfo.ownerAddress,
            network: ethereumInfo.network,
          },
        },
      });

      history.push(url.buildUrl(null, `/sites/${match.params.siteSlug}/settings/${SECTION_IDS.ENS}`));
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
    }

    setState({
      ...state,
      loading: false,
    });
  };

  const handleTryAnotherDomain = () => {
    setState({
      ...state,
      domain: '',
      step: STEPS.VERIFY,
      ensDomainInfo: null,
    });
  };

  return (
    <div>
      <GenericButton
        loading={state.loading}
        disabled={!state.ensDomainInfo.ownerAddress || siteId === ''}
        onClick={handleAddDomain}
        buttonVariant="primary"
        className={classes.button}
      >
        <Typography variant="body2">
          {t('sites.tabs.settings.ens.addEns.yesAdd')}
        </Typography>
      </GenericButton>
      <GenericButton
        buttonVariant="secondary"
        className={classes.cancelBtn}
        onClick={handleTryAnotherDomain}
      >
        <Typography variant="body2">
          {t('sites.tabs.settings.ens.addEns.noAnother')}
        </Typography>
      </GenericButton>
    </div>
  );
};

VerifyButtons.propTypes = {
  state: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    step: PropTypes.string.isRequired,
    ensDomainInfo: PropTypes.shape({
      ownerAddress: PropTypes.string,
    }),
  }).isRequired,
  setState: PropTypes.func.isRequired,
  siteId: PropTypes.string.isRequired,
};

export default VerifyButtons;
