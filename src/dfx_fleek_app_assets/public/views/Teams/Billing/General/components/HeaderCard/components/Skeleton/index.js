import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonLoading = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        <Skeleton
          width={270}
          height={28}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
      <div className={classes.billingDate}>
        <Skeleton
          width={385}
          height={24}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
    </>
  );
};

export default SkeletonLoading;
