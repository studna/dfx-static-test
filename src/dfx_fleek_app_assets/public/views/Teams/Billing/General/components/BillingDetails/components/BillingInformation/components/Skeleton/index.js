import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.firstLineWrapper}>
        <div className={classes.tag}>
          <Skeleton
            width={44}
            height={20}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <div className={classes.value}>
          <Skeleton
            width={98}
            height={20}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
      </div>
      <div className={classes.secondLineWrapper}>
        <div className={classes.tag}>
          <Skeleton
            width={40}
            height={20}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <div className={classes.value}>
          <Skeleton
            width={173}
            height={20}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
