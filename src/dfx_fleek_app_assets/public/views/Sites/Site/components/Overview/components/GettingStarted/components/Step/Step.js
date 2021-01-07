import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import IconFA from '@terminal-packages/ui/core/IconFA';

import useStyles from './styles';

const Step = ({
  orderNumber,
  title,
  subtitle,
  buttonText,
  buttonCallback,
  isDone,
  isCogIcon,
  isStepDisabled,
}) => {
  const classes = useStyles({ isStepDisabled });

  return (
    <li className={classes.root}>
      <div className={classes.stepContent}>
        <div
          className={classnames(
            classes.stepNumber,
            classes.disabledOpacity,
          )}
        >
          {orderNumber}
        </div>
        <div
          className={classnames(
            classes.stepDetail,
            classes.disabledOpacity,
          )}
        >
          <div className={classes.title}>
            <Typography variant="body1">
              {title}
            </Typography>
            {isCogIcon && (
              <IconFA icon={['fal', 'cog']} className={classes.cogIcon} />
            )}
          </div>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
        </div>
        <div className={classes.stepStatus}>
          {isDone ? (
            <IconFA icon={['far', 'check']} />
          ) : (
            <GenericButton
              disabled={isStepDisabled}
              onClick={buttonCallback}
              buttonVariant="primary"
              overrideClass={{
                button: classes.stepAction,
              }}
            >
              {buttonText}
            </GenericButton>
          )}
        </div>
      </div>
    </li>
  );
};

Step.defaultProps = {
  buttonText: undefined,
  buttonCallback: undefined,
  isCogIcon: false,
};

Step.propTypes = {
  orderNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  isDone: PropTypes.bool.isRequired,
  isStepDisabled: PropTypes.bool.isRequired,
  buttonCallback: PropTypes.func,
  isCogIcon: PropTypes.bool,
};

export default Step;
