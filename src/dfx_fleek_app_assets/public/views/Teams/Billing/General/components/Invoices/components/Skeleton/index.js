import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonLoading = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.rowWrapper}>
        <div className={classes.date}>
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
        <div className={classes.charge}>
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
      <div className={classes.rowWrapper}>
        <div className={classes.date}>
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
        <div className={classes.charge}>
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
