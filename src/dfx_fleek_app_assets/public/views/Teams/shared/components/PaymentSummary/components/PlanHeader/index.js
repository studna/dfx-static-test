import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { billing } from '@Shared';

import useStyles from './styles';

const PlanHeader = ({ name, description, price }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const priceInDollars = billing.getDollarsFromCents(t, price);

  return (
    <div className={classes.planInfoContainer}>
      <Typography className={classes.title}>
        {t('billing.changePlan.step2Payment.pickedPlan', {
          type: name,
          price: priceInDollars,
        })}
      </Typography>
      <Typography className={classes.subtitle}>
        {description}
      </Typography>
    </div>
  );
};

PlanHeader.defaultProps = {
  name: '',
  description: '',
  price: 0,
};

PlanHeader.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default PlanHeader;
