import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useStyles from '../sharedStyles';

const NotDeployed = ({
  i18n,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.waitingWrapper}>
        <Typography className={classes.waiting}>
          {i18n.notDeployed}
        </Typography>
      </div>
      <Typography className={classes.paragraph}>
        {i18n.notDeployedParagraph}
      </Typography>
    </div>
  );
};

NotDeployed.defaultProps = {
  i18n: {},
};

NotDeployed.propTypes = {
  i18n: PropTypes.shape({
    notDeployed: PropTypes.string.isRequired,
    notDeployedParagraph: PropTypes.string.isRequired,
  }),
};

export default NotDeployed;
