import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const CommandText = ({ title, detail }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="body2"
        display="inline"
        className={classes.title}
      >
        {title}:
      </Typography>
      <Typography
        variant="body2"
        display="inline"
        className={classes.detail}
      >
        {detail}
      </Typography>
    </div>
  );
};

CommandText.defaultProps = {
  title: '',
  detail: '',
};

CommandText.propTypes = {
  title: PropTypes.string,
  detail: PropTypes.string,
};

export default CommandText;
