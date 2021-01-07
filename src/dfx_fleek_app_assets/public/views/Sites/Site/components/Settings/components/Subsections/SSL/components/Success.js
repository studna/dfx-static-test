import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconFA from '@terminal-packages/ui/core/IconFA';
import StripedList from '@terminal-packages/ui/core/StripedList';

import useStyles from '../sharedStyles';

const Success = ({
  i18n,
  certificate,
  domains,
  expires,
  created,
}) => {
  const classes = useStyles();
  const getDomains = () => domains.map((domain, index) => {
    if (index === 0) {
      return (
        <div key={domain}>
          <Typography className={classes.tag}>
            {i18n.domains}
          </Typography>
          <Typography className={classes.darkText}>
            {domain}
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.newDomain}>
        <Typography className={classes.tag}>
          {' '}
        </Typography>
        <Typography className={classes.darkText}>
          {domain}
        </Typography>
      </div>
    );
  });

  return (
    <>
      <div className={classes.enabledWrapper}>
        <div className={classes.enabledTextWrapper}>
          <Typography className={classes.darkText}>
            {i18n.httpEnabled}
          </Typography>
        </div>
        <div className={classes.checkIcon}>
          <IconFA
            fontSize="inherit"
            icon={['fal', 'check']}
          />
        </div>
      </div>
      <StripedList>
        <div className={classes.infoLine}>
          <Typography className={classes.tag}>
            {i18n.certificate}
          </Typography>
          <Typography className={classes.darkText}>
            {certificate}
          </Typography>
        </div>
        <div className={classes.infoLine}>
          {getDomains()}
        </div>
        <div className={classes.infoLine}>
          <Typography className={classes.tag}>
            {i18n.expires}
          </Typography>
          <Typography className={classes.darkText}>
            {expires}
          </Typography>
        </div>
        <div className={classes.infoLine}>
          <Typography className={classes.tag}>
            {i18n.created}
          </Typography>
          <Typography className={classes.darkText}>
            {created}
          </Typography>
        </div>
      </StripedList>
    </>
  );
};

Success.defaultProps = {
  i18n: {},
  certificate: '',
  domains: '',
  expires: '',
  created: '',
};

Success.propTypes = {
  i18n: PropTypes.shape({
    expires: PropTypes.string,
    created: PropTypes.string,
    domains: PropTypes.string,
    httpEnabled: PropTypes.string,
    certificate: PropTypes.string,
  }),
  certificate: PropTypes.string,
  domains: PropTypes.arrayOf(PropTypes.string),
  expires: PropTypes.string,
  created: PropTypes.string,
};

export default Success;
