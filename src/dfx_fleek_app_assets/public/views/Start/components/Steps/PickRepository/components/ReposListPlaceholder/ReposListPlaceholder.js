import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';

const skeletonsWidthsInPercent = [52, 80, 67, 43, 31];

const ReposListPlaceholder = () => {
  const classes = useStyles();

  return (
    <>
      {skeletonsWidthsInPercent.map((width) => (
        <Skeleton
          key={width}
          width={`${width}%`}
          height={29}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      ))}
    </>
  );
};

export default ReposListPlaceholder;
