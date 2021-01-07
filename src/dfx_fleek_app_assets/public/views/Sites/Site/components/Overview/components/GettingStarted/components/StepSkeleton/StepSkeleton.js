import React from 'react';
import PropTypes from 'prop-types';

import Skeleton from '@material-ui/lab/Skeleton';
import classnames from 'classnames';
import useStyles from './styles';

const StepSkeleton = ({ orderNumber }) => {
  const classes = useStyles();

  return (
    <li className={classes.root}>
      <div className={classes.stepContent}>
        <div className={classes.stepNumber}>{orderNumber}</div>
        <div className={classes.stepDetail}>
          <Skeleton
            width={170}
            height={24}
            variant="rect"
            animation="wave"
            classes={{
              root: classnames(
                classes.skeletonRoot,
                classes.titleSkeleton,
              ),
            }}
          />
          <Skeleton
            width={470}
            height={14}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <Skeleton
          width={175}
          height={25}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
    </li>
  );
};

StepSkeleton.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default StepSkeleton;
