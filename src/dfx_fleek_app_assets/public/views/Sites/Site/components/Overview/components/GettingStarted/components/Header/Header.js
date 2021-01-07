import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import IconFA from '@terminal-packages/ui/core/IconFA';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import useStyles from './styles';

const Header = ({ onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.headerContent}>
      <Typography variant="body1">
        <Box fontWeight={500}>
          {t('sitesGettingStarted.title')}
        </Box>
      </Typography>
      <GenericButton
        overrideClass={{
          button: classes.closeButton,
        }}
        onClick={onClose}
        disableRipple
        disableElevation
      >
        <IconFA
          icon={['fal', 'times-circle']}
          fontSize="inherit"
        />
      </GenericButton>
    </div>
  );
};

Header.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Header;
