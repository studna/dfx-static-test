import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Chip from '@terminal-packages/ui/core/Chip';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import { STEPS } from '../../container/AddEnsDomainForm/constants';
import useStyles from './styles';

const EnsDomainField = ({
  state,
  setState,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isAlreadyInUse = get(state, 'ensDomainInfo.isAlreadyInUse');

  const handleInputChange = (event) => {
    setState({
      ...state,
      domain: event.target.value,
      step: STEPS.VERIFY,
    });
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <InputWithError
            value={state.domain}
            label={t('sites.tabs.settings.ens.addEns.ensDomain')}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {
        isAlreadyInUse && (
          <div className={classes.chipContainer}>
            <Chip
              text={t('sites.tabs.settings.ens.addEns.domainRegistered')}
              color="yellow"
            />
          </div>
        )
    }
    </>
  );
};


EnsDomainField.propTypes = {
  state: PropTypes.shape({
    domain: PropTypes.string.isRequired,
    ensDomainInfo: PropTypes.shape({
      isAlreadyInUse: PropTypes.string.isRequired,
    }),
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default EnsDomainField;
