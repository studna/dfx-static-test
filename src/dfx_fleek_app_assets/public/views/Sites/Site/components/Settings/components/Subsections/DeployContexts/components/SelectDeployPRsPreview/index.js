import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Option from './components/Option';

const SelectDeployPRsPreview = ({ value, onChange }) => {
  const { t } = useTranslation();
  const onChangeWrapper = (val) => onChange(val === 'true');

  return (
    <div>
      <Option
        checked={value}
        value
        onChange={onChange}
        title={t('siteSettings.deployment.deployContexts.previewPRs.onTitle')}
        description={
          t('siteSettings.deployment.deployContexts.previewPRs.onDescription')
        }
        id="prs-preview-on"
      />
      <Option
        checked={!value}
        value={false}
        onChange={onChangeWrapper}
        title={t('siteSettings.deployment.deployContexts.previewPRs.offTitle')}
        description={
          t('siteSettings.deployment.deployContexts.previewPRs.offDescription')
        }
        id="prs-preview-off"
      />
    </div>
  );
};

SelectDeployPRsPreview.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectDeployPRsPreview;
