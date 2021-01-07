import React from 'react';
import PropTypes from 'prop-types';
import IconFA from '@terminal-packages/ui/core/IconFA';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { url } from '@Shared';
import { Trans } from 'react-i18next';
import { MODAL_DEFAULT_OPEN, PAYMENT } from '../../views/Teams/Billing/General/constants';
import useStyles from './styles';

const AccountSuspensionBanner = ({
  isSuspended,
}) => {
  const classes = useStyles();

  const teamId = url.getAccountIdFromUrl();

  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <IconFA icon={['far', 'exclamation-triangle']} className={classes.icon} />
      </div>
      <Typography className={classes.text}>
        <Trans
          i18nKey={
            isSuspended
              ? 'accountSuspensionBanner.suspendedMessage'
              : 'accountSuspensionBanner.restrictedMessage'
          }
          components={[
            null,
            <Link
              to={url.buildUrl({ [MODAL_DEFAULT_OPEN]: PAYMENT }, `/teams/${teamId}/billing/general`)}
              className={classes.link}
            >
              Add your billing information.
            </Link>,
          ]}
        />
      </Typography>
    </div>
  );
};

AccountSuspensionBanner.propTypes = {
  isSuspended: PropTypes.bool.isRequired,
};

export default AccountSuspensionBanner;
