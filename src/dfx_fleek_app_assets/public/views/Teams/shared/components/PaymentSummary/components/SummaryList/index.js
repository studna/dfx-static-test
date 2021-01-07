import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import StripedList from '@terminal-packages/ui/core/StripedList';
import Typography from '@material-ui/core/Typography';
import { billing } from '@Shared';

import useStyles from './styles';

const SummaryList = ({ itemsList }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const totalPrice = itemsList.reduce(
    (total, { price }) => total + price,
    0,
  );

  const totalPriceInDollars = billing.getDollarsFromCents(t, totalPrice);

  return (
    <>
      <Typography className={classes.title}>
        {t('billing.changePlan.step2Payment.summary')}
      </Typography>
      <Typography className={classes.subtitle}>
        {t('billing.changePlan.step2Payment.summarySubtitle')}
      </Typography>
      <StripedList>
        {itemsList.map((item) => (
          <div className={classes.billLineContainer} key={item.name}>
            <Typography className={classes.additionText}>
              {item.name}
            </Typography>
            <Typography className={classes.additionText}>
              {billing.getDollarsFromCents(t, item.price)}
            </Typography>
          </div>
        )).concat([(
          <div className={classes.billLineContainer} key="total">
            <Typography className={classes.totalText}>
              {t('billing.changePlan.step2Payment.total')}
            </Typography>
            <Typography className={classes.totalText}>
              {totalPriceInDollars}
            </Typography>
          </div>
        )])}
      </StripedList>
    </>
  );
};

SummaryList.defaultProps = {
  itemsList: [],
};

SummaryList.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
};

export default SummaryList;
