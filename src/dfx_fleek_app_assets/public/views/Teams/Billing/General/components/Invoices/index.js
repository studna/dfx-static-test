import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { billing } from '@Shared';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import StripedList from '@terminal-packages/ui/core/StripedList';
import Skeleton from './components/Skeleton';
import useStyles from './styles';

const Invoices = (props) => {
  const {
    invoices,
    loading,
  } = props;

  const { t } = useTranslation();

  const classes = useStyles();

  const getContent = () => {
    if (invoices.length === 0) {
      return (
        <>
          {t('billing.invoices.receipts.defaultReceipt')}
        </>
      );
    }

    return (
      <StripedList>
        {invoices.map((invoice) => {
          const timestamp = moment(invoice.timestamp);
          const date = timestamp.format('MMM DD, YYYY');
          const time = timestamp.format('LT');
          const price = billing.getDollarsFromCents(t, invoice.price);

          return (
            <div className={classes.receiptContainer}>
              <Typography className={classes.date}>
                {t('billing.invoices.receipts.timestamp', {
                  date,
                  time,
                })}
              </Typography>
              <Typography className={classes.charge}>
                {t('billing.invoices.receipts.charged', {
                  price,
                  creditCard: invoice.creditCardName,
                  fourLastDigits: invoice.fourLastDigits,
                })}
              </Typography>
            </div>
          );
        })}
      </StripedList>
    );
  };
  return (
    <>
      <div className={classes.header}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('billing.invoices.title')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t('billing.invoices.subtitle')}
        </Typography>
      </div>
      <CardTitled
        mainContent={t('billing.invoices.title')}
        classes={{
          content: classes.sectionContent,
        }}
      >
        {loading ? (
          <Skeleton />
        ) : (
          getContent()
        )}
      </CardTitled>
    </>
  );
};

Invoices.defaultProps = {
  invoices: [],
};

Invoices.propTypes = {
  invoices: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      creditCardName: PropTypes.string.isRequired,
      fourLastDigits: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    }),
  ),
  loading: PropTypes.bool.isRequired,
};

export default Invoices;
