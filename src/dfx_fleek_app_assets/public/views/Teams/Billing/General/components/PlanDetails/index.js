import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import currency from 'currency.js';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import classnames from 'classnames';
import Skeleton from './components/Skeleton';
import useStyles from './styles';

const numberOfMBsInOneGB = 1000;

const getBandwidthDetails = (valueInMBs) => {
  if (valueInMBs >= numberOfMBsInOneGB) {
    return {
      unit: 'gb',
      value: Math.round(valueInMBs / numberOfMBsInOneGB),
    };
  }
  return {
    unit: 'mb',
    value: valueInMBs,
  };
};

const PlanDetails = (props) => {
  const {
    onClickChangePlan,
    planType,
    startDate: startDateRaw,
    usedBandwidth,
    bandwidthLimit,
    usedMinutes,
    minutesLimit,
    price,
    loading,
  } = props;

  const { t } = useTranslation();

  const classes = useStyles();

  const startDate = moment(startDateRaw).format('MMM DD[,] YYYY');
  const limitDetails = getBandwidthDetails(bandwidthLimit);
  const usedDetails = getBandwidthDetails(usedBandwidth.value);

  const getContent = () => (
    <div className={classes.detailsContainer}>
      <div className={classes.planTypeContainer}>
        <Typography className={classes.mainText}>
          {planType && t('billing.planDetails.teamPlan', {
            type: planType,
          })}
        </Typography>
        <Typography className={classes.subText}>
          {t('billing.planDetails.effectiveFrom', { startDate })}
        </Typography>
      </div>
      <div>
        <Typography className={classes.mainText}>
          {t('billing.planDetails.bandwidth', {
            used: usedDetails.value,
            unit: t(`billing.planDetails.${usedDetails.unit}`),
            limitUnit: t(`billing.planDetails.${limitDetails.unit}`),
            limit: limitDetails.value,
          })}
        </Typography>
        <Typography className={classes.subText}>
          {t('billing.planDetails.minutes', {
            used: usedMinutes,
            limit: minutesLimit,
          })}
        </Typography>
      </div>
      <div className={classes.pricingContainer}>
        <Typography className={classnames(classes.mainText, classes.pricingText)}>
          {t('billing.planDetails.price', {
            price: currency(price, { precision: 2 }),
          })}
        </Typography>
      </div>
    </div>
  );

  return (
    <>
      <div className={classes.header}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('billing.planDetails.title')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('billing.planDetails.subtitle')}
        </Typography>
      </div>
      <CardTitled
        mainContent={t('billing.planDetails.cardTitle')}
      >
        {loading ? (
          <Skeleton />
        ) : (
          getContent()
        )}
        <a
          href="https://fleek.co/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.resetAnchorStyles}
        >
          <ArrowLink>
            {t('billing.planDetails.link')}
          </ArrowLink>
        </a>
        <GenericButton
          buttonVariant="primary"
          onClick={onClickChangePlan}
          className={classes.button}
          disabled={loading}
        >
          {t('billing.planDetails.buttonText')}
        </GenericButton>
      </CardTitled>
    </>

  );
};

PlanDetails.defaultProps = {
  onClickChangePlan: () => {},
  planType: null,
  startDate: '',
  usedBandwidth: {
    value: '0',
    unit: 'mb',
    limitUnit: 'mb',
  },
  usedMinutes: '0',
  minutesLimit: '0',
  bandwidthLimit: '0',
  price: '0.00',
};

PlanDetails.propTypes = {
  onClickChangePlan: PropTypes.func,
  planType: PropTypes.string,
  startDate: PropTypes.string,
  usedBandwidth: PropTypes.shape({
    value: PropTypes.string,
    unit: PropTypes.string,
    limitUnit: PropTypes.string,
  }),
  bandwidthLimit: PropTypes.string,
  usedMinutes: PropTypes.string,
  minutesLimit: PropTypes.string,
  price: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default PlanDetails;
