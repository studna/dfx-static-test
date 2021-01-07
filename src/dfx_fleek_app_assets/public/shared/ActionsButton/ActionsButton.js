import React from 'react';
import PropTypes from 'prop-types';

import IconFA from '@terminal-packages/ui/core/IconFA';
import MenuDropdown from '@terminal-packages/ui/core/MenuDropdown';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton/GenericButton';

import useStyles from './styles';

const ActionsButton = ({
  btnName,
  disabled,
  children,
}) => {
  const classes = useStyles();

  return (
    <MenuDropdown
      offsetTop={7}
      className={classes.list}
      menuId="actions-menu-dropdown"
      trigger={(
        <GenericButton
          disableRipple
          disableFocusRipple
          disabled={disabled}
          buttonVariant="secondary"
          overrideClass={{
            button: classes.button,
          }}
        >
          <div className={classes.buttonContent}>
            <span>{btnName}</span>
            <IconFA icon={['fal', 'angle-down']} />
          </div>
        </GenericButton>
      )}
    >
      {children}
    </MenuDropdown>
  );
};

ActionsButton.defaultProps = {
  children: null,
  disabled: false,
};

ActionsButton.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  btnName: PropTypes.string.isRequired,
};

export default ActionsButton;
