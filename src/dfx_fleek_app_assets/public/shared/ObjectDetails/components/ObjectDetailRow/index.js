import React from 'react';
import PropTypes from 'prop-types';

import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const MAX_SKELETON_WIDTH = 450;
const MIN_SKELETON_WIDTH = 130;

const ObjectDetailRow = ({ field, value, loading }) => {
  const classes = useStyles();

  const getValueContent = () => {
    if (loading) {
      const randomeWidth = Math.floor(
        Math.random() * (MAX_SKELETON_WIDTH - MIN_SKELETON_WIDTH + 1) + MIN_SKELETON_WIDTH,
      );

      return (
        <Skeleton
          height={22}
          width={randomeWidth}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      );
    }

    return (
      <Typography noWrap variant="body2">
        {value}
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.field}
      >
        {field}
      </Typography>
      {getValueContent()}
    </div>
  );
};

ObjectDetailRow.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ObjectDetailRow;
