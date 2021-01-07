import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const StepBase = ({
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography variant="body1" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {subtitle}
        </Typography>
      </div>
      {children}
    </div>
  );
};

StepBase.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default StepBase;
