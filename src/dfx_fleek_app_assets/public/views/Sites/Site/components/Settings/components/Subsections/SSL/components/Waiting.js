import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconFA from '@terminal-packages/ui/core/IconFA';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import useStyles from '../sharedStyles';

const Waiting = ({
  i18n,
  buttonOnClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.waitingWrapper}>
        <Typography className={classes.waiting}>
          {i18n.waiting}
        </Typography>
        <div className={classes.gearIcon}>
          <IconFA
            fontSize="inherit"
            icon={['fal', 'cog']}
          />
        </div>
      </div>
      <div className={classes.paragraphWrapper}>
        <Typography className={classes.paragraph}>
          {i18n.waitingParagraph}
        </Typography>
      </div>
      <GenericButton
        buttonVariant="secondary"
        onClick={buttonOnClick}
      >
        {i18n.buttonText}
      </GenericButton>
    </div>
  );
};

Waiting.defaultProps = {
  i18n: {},
  buttonOnClick: () => {},
};

Waiting.propTypes = {
  i18n: PropTypes.shape({
    waiting: PropTypes.string,
    buttonText: PropTypes.string,
    waitingParagraph: PropTypes.string,
  }),
  buttonOnClick: PropTypes.func,
};

export default Waiting;
