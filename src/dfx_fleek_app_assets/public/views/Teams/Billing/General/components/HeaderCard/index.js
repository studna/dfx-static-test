import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Box from '@terminal-packages/ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTranslation, Trans } from 'react-i18next';
import ArrowLink from '@terminal-packages/ui/core/ArrowLink';
import useStyles from './styles';
import Skeleton from './components/Skeleton';

const HeaderCard = (props) => {
  const {
    recipient,
    startDate: startDateRaw,
    endDate: endDateRaw,
    loading,
  } = props;
  const { t } = useTranslation();
  const getFormattedDates = (date) => (moment(date).format('MMM DD[, ]YYYY'));
  const startDate = getFormattedDates(startDateRaw);

  const shownEndDateRaw = endDateRaw || moment(startDateRaw).add(1, 'M');
  const endDate = getFormattedDates(shownEndDateRaw);

  const classes = useStyles();

  const getContent = () => (
    <>
      <Typography className={classes.title}>
        {t('billing.headerCard.billingFor', { recipient })}
      </Typography>
      <Typography className={classes.subTitle}>
        <Trans
          i18nKey="billing.headerCard.billingPeriod"
          values={{ startDate, endDate }}
          components={[
            null,
            <span className={classes.blackColor}>START_DATE</span>,
            null,
            <span className={classes.blackColor}>END_DATE</span>,
            null,
          ]}
        />
      </Typography>
    </>
  );

  return (
    <Box>
      {loading ? (
        <Skeleton />
      ) : (
        getContent()
      )}
      <a
        href="https://docs.fleek.co"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.resetAnchorStyles}
      >
        <ArrowLink>
          {t('billing.headerCard.learnMore')}
        </ArrowLink>
      </a>
    </Box>
  );
};

HeaderCard.defaultProps = {
  recipient: '',
  startDate: '',
  endDate: '',
};

HeaderCard.propTypes = {
  recipient: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HeaderCard;
