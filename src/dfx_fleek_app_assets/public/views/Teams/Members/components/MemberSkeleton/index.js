import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import ListItem from '@terminal-packages/ui/core/ListItem';

import useStyles from './styles';

const SKELETON_VARIANT = 'rect';
const SKELETON_ANIMATION = 'wave';

const MemberSkeleton = () => {
  const classes = useStyles();

  return (
    <ListItem className={classes.member}>
      <div className={classes.memberInfo}>
        <Skeleton
          width={48}
          height={48}
          variant={SKELETON_VARIANT}
          animation={SKELETON_ANIMATION}
          classes={{
            root: classes.skeletonRoot,
          }}
        />
        <div>
          <Skeleton
            width={97}
            height={20}
            variant={SKELETON_VARIANT}
            animation={SKELETON_ANIMATION}
            classes={{
              root: classes.skeletonRoot,
            }}
          />
          <Skeleton
            height={18}
            width={146}
            variant={SKELETON_VARIANT}
            animation={SKELETON_ANIMATION}
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </div>
      </div>
      <div className={classes.memberStatus}>
        <Skeleton
          height={20}
          width={46}
          variant={SKELETON_VARIANT}
          animation={SKELETON_ANIMATION}
          classes={{
            root: classes.skeletonRoot,
          }}
        />
        <Skeleton
          width={47}
          height={18}
          variant={SKELETON_VARIANT}
          animation={SKELETON_ANIMATION}
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      </div>
      <Skeleton
        width={5}
        height={21}
        variant={SKELETON_VARIANT}
        animation={SKELETON_ANIMATION}
        classes={{
          root: classes.skeletonRoot,
        }}
      />
    </ListItem>
  );
};

export default MemberSkeleton;
