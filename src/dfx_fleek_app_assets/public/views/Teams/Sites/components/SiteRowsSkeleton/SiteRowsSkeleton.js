import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@terminal-packages/ui/core/Skeleton';
import useStyles from './styles';


const SiteRowSkeleton = (props) => {
  const {
    amountRows,
  } = props;

  const classes = useStyles(props);

  const getSkeletonRow = (index) => (
    <div key={index} className={classes.rowContainer}>
      <div className={classes.imageContainer}>
        <Skeleton width={66} height={48} />
      </div>
      <div className={classes.siteInfoContainer}>
        <Skeleton width={133} height={19} />
        <Skeleton width={166} height={14} />
      </div>
      <div className={classes.siteOwnerInfoContainer}>
        <Skeleton width={202} height={19} />
        <Skeleton width={264} height={14} />
      </div>
      <div className={classes.endArrowContainer}>
        <Skeleton width={16} height={22} />
      </div>
    </div>
  );

  return (
    useMemo(() => (
      <div>
        {Array(amountRows).fill().map((_, index) => getSkeletonRow(index))}
      </div>
    ), [])
  );
};


SiteRowSkeleton.defaultProps = {
  amountRows: 4,
};

SiteRowSkeleton.propTypes = {
  amountRows: PropTypes.number,
};

export default SiteRowSkeleton;
