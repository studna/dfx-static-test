import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import Box from '@terminal-packages/ui/core/Box';

import Step from './components/Step';
import StepSkeleton from './components/StepSkeleton';
import Header from './components/Header';
import useStepsConfig from './useStepsConfig';
import useStyles from './styles';

const LOCAL_STORAGE_PREFIX_KEY = 'hideSiteGettingStartedSection';

const GettingStarted = ({ siteBySlug }) => {
  const { params: { siteSlug } } = useRouteMatch();
  const localStorageKey = `${LOCAL_STORAGE_PREFIX_KEY}_${siteSlug}`;
  const stepsConfig = useStepsConfig(siteBySlug);
  const [isHidden, setIsHidden] = useState(
    !!window.localStorage.getItem(localStorageKey),
  );
  const classes = useStyles();

  const onClose = () => {
    window.localStorage.setItem(localStorageKey, true);
    setIsHidden(true);
  };
  const { loading } = siteBySlug;

  const ListItemComponent = loading ? StepSkeleton : Step;

  if (isHidden) {
    return null;
  }

  return (
    <Box padding={0} overrideClass={{ wrapper: classes.sectionWrapper }}>
      <Header onClose={onClose} />
      <ol className={classes.list}>
        {stepsConfig.map((stepProps) => (
          <ListItemComponent
            key={stepProps.orderNumber}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...stepProps}
          />
        ))}
      </ol>
    </Box>
  );
};

GettingStarted.propTypes = {
  siteBySlug: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
};

export default GettingStarted;
