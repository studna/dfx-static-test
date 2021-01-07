import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import useStyles from '../sharedStyles';

const ErrorComponent = ({
  i18n,
  errorDocsLink,
  buttonOnClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.contentWrapper}>
      <div className={classes.alertBoxWrapper}>
        <AlertBox
          message={i18n.error}
          icon={['fal', 'info-circle']}
          type="error"
        />
      </div>
      <div className={classes.paragraphWrapper}>
        <Typography className={classes.paragraph}>
          {i18n.errorParagraph}
        </Typography>
      </div>
      <div className={classes.linkWrapper}>
        <a
          href={errorDocsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.resetAnchorStyles}
        >
          <ArrowLink>
            {i18n.errorLink}
          </ArrowLink>
        </a>
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

ErrorComponent.defaultProps = {
  i18n: {},
  buttonOnClick: () => {},
};

ErrorComponent.propTypes = {
  i18n: PropTypes.shape({
    errorLink: PropTypes.string,
    error: PropTypes.string,
    buttonText: PropTypes.string,
    errorParagraph: PropTypes.string,
  }),
  errorDocsLink: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func,
};

export default ErrorComponent;
