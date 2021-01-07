import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonLoading = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.lineWrapper}>
        <div className={classes.info}>
          <Skeleton
            width={120}
            height={20}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <div className={classes.creditCardNumber}>
          <Skeleton
            width={150}
            height={22}
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
