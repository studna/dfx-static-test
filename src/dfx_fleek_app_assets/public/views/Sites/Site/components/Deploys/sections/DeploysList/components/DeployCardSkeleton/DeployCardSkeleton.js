import React from 'react';
import classnames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@terminal-packages/ui/core/Box';
import IconFA from '@terminal-packages/ui/core/IconFA';

import useStyles from './styles';

const DeployCardSkeleton = () => {
  const classes = useStyles();

  return (
    <Box overrideClass={{ wrapper: classes.root }} border>
      <div className={classes.leftPart}>
        <Skeleton
          width={190}
          height={26}
          variant="rect"
          animation="wave"
          classes={{
            root: classnames(classes.skeletonRoot, classes.titleSkeleton),
          }}
        />
        <Skeleton
          width={76}
          height={26}
          variant="rect"
          animation="wave"
          classes={{
            root: classnames(classes.skeletonRoot, classes.chipSkeleton),
          }}
        />
        <Skeleton
          width={130}
          height={18}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
      <div className={classes.rightPart}>
        <Skeleton
          width={140}
          height={26}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
        <Skeleton
          width={200}
          height={18}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
      <IconFA icon={['far', 'chevron-right']} className={classes.icon} />
    </Box>
  );
};

export default DeployCardSkeleton;
