import React from 'react';
import PropTypes from 'prop-types';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import ListItem from '@terminal-packages/ui/core/ListItem';

import useStyles from './styles';

const Option = ({
  name,
  warning,
  onClick,
}) => {
  const classes = useStyles();
  const color = warning ? 'error' : 'primary';

  return (
    <ListItem className={classes.option}>
      <ButtonBase
        type="button"
        onClick={onClick}
      >
        <Typography
          color={color}
          variant="caption"
        >
          {name}
        </Typography>
      </ButtonBase>
    </ListItem>
  );
};

Option.defaultProps = {
  warning: false,
};

Option.propTypes = {
  warning: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Option;
