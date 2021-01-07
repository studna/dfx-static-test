import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from './styles';

const Option = ({
  checked,
  value,
  onChange,
  title,
  description,
  id,
}) => {
  const classes = useStyles();

  return (
    <label className={classes.root} htmlFor={id}>
      <Radio
        checked={checked}
        onChange={(evt) => onChange(evt.target.value)}
        value={value}
        name="auto-build-PRs"
        id={id}
        classes={{
          root: classes.radioBtn,
          checked: classes.radioBtnChecked,
        }}
      />
      <div>
        <Box fontWeight={500}>
          <Typography variant="body2">{title}</Typography>
        </Box>
        <Typography
          className={classes.description}
          color="textSecondary"
        >
          {description}
        </Typography>
      </div>
    </label>
  );
};

Option.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Option;
