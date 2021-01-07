/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ComplexOverlayBox from '@terminal-packages/ui/core/ComplexOverlayBox';
import useOverlayConfig from './hooks/useOverlayConfig';
import { OVERLAY_TYPES } from './constants';

import useStyles from './styles';

const NoDataOverlay = ({
  isContentActive,
  type,
}) => {
  const {
    i18n,
    onClickButton,
    link,
    ImageComponent,
    overrideClasses,
  } = useOverlayConfig(type);

  const classes = useStyles();

  return (
    <ComplexOverlayBox
      i18n={i18n}
      onClickButton={onClickButton}
      link={link}
      ImageComponent={ImageComponent}
      overrideClasses={{
        ...overrideClasses,
        backdrop: classes.backdrop,
      }}
      isShownOverlay={!isContentActive}
    >
      {null}
    </ComplexOverlayBox>
  );
};

NoDataOverlay.propTypes = {
  type: PropTypes.oneOf(Object.values(OVERLAY_TYPES)).isRequired,
  isContentActive: PropTypes.bool.isRequired,
};

export default NoDataOverlay;
