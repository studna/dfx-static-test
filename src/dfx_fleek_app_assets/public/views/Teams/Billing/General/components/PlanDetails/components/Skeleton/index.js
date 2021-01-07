import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonLoading = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.firstRowWrapper}>
        <div className={classes.plan}>
          <Skeleton
            width={118}
            height={20}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <div className={classes.bandwidth}>
          <Skeleton
            width={178}
            height={22}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <div className={classes.price}>
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
      </div>
      <div className={classes.secondRowWrapper}>
        <div className={classes.planDate}>
          <Skeleton
            width={165}
            height={18}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <div className={classes.buildMinutes}>
          <Skeleton
            width={123}
            height={18}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SkeletonLoading;
