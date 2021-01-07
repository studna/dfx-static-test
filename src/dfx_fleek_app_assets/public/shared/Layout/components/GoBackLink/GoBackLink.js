import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import IconFA from '@terminal-packages/ui/core/IconFA';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const GoBackLink = ({
  onClick,
  buttonText,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <GenericButton
      onClick={onClick || history.goBack}
      overrideClass={{ button: classes.button }}
    >
      <IconFA
        icon={['fal', 'long-arrow-left']}
        color="inherit"
        className={classes.icon}
      />
      <Typography variant="body2" className={classes.backButtonText}>
        {buttonText || t('common.back')}
      </Typography>
    </GenericButton>
  );
};

GoBackLink.defaultProps = {
  onClick: undefined,
  buttonText: undefined,
};

GoBackLink.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
};

export default GoBackLink;
