import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const AddCustomDomain = ({
  error,
  domainName,
  enableEdit,
  onChangeDomainName,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const onChangeDomainNameInput = (e) => {
    onChangeDomainName(e.target.value);
  };

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        {t('addCustomDomain.title')}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {t('addCustomDomain.description')}
      </Typography>
      <a
        href="https://docs.fleek.co/hosting/domain-management/#custom-domains"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <ArrowLink>{t('addCustomDomain.linkToDocs')}</ArrowLink>
      </a>
      <div className={classes.inputWrapper}>
        <InputWithError
          error={!!error}
          value={domainName}
          errorMessage={error}
          disabled={!enableEdit}
          className={classes.input}
          onChange={onChangeDomainNameInput}
          label={t('addCustomDomain.inputLabel')}
        />
      </div>
    </div>
  );
};

AddCustomDomain.defaultProps = {
  error: '',
  enableEdit: true,
};

AddCustomDomain.propTypes = {
  error: PropTypes.string,
  enableEdit: PropTypes.bool,
  domainName: PropTypes.string.isRequired,
  onChangeDomainName: PropTypes.func.isRequired,
};

export default AddCustomDomain;
