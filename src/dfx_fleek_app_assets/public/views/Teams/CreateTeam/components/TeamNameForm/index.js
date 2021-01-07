import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import StepBase from '@Shared/StepBase';

import useStyles from './styles';


const TeamNameForm = ({
  initialValue,
  setTeamName,
}) => {
  const [name, setName] = useState(initialValue);

  const classes = useStyles();
  const { t } = useTranslation();

  const transPrefix = 'team.create.stepper.step1.teamName.';

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    setTeamName(name);
  };

  return (
    <StepBase
      title={t(`${transPrefix}title`)}
      subtitle={t(`${transPrefix}subtitle`)}
    >
      <div>
        <div className={classes.inputWrapper}>
          <InputWithError
            value={name}
            className={classes.input}
            onChange={onChangeName}
            label={t(`${transPrefix}inputLabel`)}
          />
        </div>
        <GenericButton
          buttonVariant="primary"
          onClick={onSubmit}
          disabled={!name}
        >
          {t(`${transPrefix}pickPlan`)}
        </GenericButton>
      </div>
    </StepBase>
  );
};

TeamNameForm.defaultProps = {
  initialValue: '',
};

TeamNameForm.propTypes = {
  setTeamName: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

export default TeamNameForm;
