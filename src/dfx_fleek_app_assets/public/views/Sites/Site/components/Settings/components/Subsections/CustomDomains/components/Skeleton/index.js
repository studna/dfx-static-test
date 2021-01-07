import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const SkeletonLoader = () => {
  const classes = useStyles();

  return (
    <div className={classes.domainWrapper}>
      <div>
        <div className={classes.domainName}>
          <Skeleton
            width={210}
            height={24}
            variant="rect"
            animation="wave"
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
        <Skeleton
          width={122}
          height={20}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
      <div className={classes.domainStatus}>
        <Skeleton
          width={110}
          height={24}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
    </div>
  );
};

export default SkeletonLoader;
