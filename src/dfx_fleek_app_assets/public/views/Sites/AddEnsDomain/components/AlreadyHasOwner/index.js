import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import { shortenEthAddress } from '@Shared/utils';
import useStyles from './styles';

const AlreadyHasOwner = ({
  state,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.text}>
        <Trans
          i18nKey="sites.tabs.settings.ens.addEns.alreadyOwner"
          components={[
            <span className={classes.domainText}>owner</span>,
          ]}
          values={{
            domain: state.domain,
            owner: shortenEthAddress(state.ensDomainInfo.registrantAddress),
          }}
        />
      </Typography>
    </div>
  );
};

AlreadyHasOwner.propTypes = {
  state: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    ensDomainInfo: PropTypes.shape({
      registrantAddress: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AlreadyHasOwner;
