import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const PurchasingDomain = ({ domainName, onConfirm }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        {t('addCustomDomain.purchasing.title', { domainName })}
      </Typography>
      <Typography variant="body2" className={classes.accentInfo}>
        {t('common.comingSoon')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {t('addCustomDomain.purchasing.description')}
      </Typography>
      <GenericButton
        buttonVariant="primary"
        onClick={onConfirm}
        overrideClass={{
          button: classes.confirmButton,
        }}
      >
        {t('addCustomDomain.purchasing.submit')}
      </GenericButton>
    </div>
  );
};

PurchasingDomain.propTypes = {
  domainName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PurchasingDomain;
