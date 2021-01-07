import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import { GET_TEAM_BILLING_INFORMATION } from '@Shared/graphql/queries';
import { newApiClient } from '@Clients';
import { useAccountId } from '@Shared';
import BillingInformation from './components/BillingInformation';
import PaymentInformation from './components/PaymentInformation';

import useStyles from './styles';

const BillingDetails = (props) => {
  const { loading } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const accountId = useAccountId();

  const {
    refetch,
    data: teamBillingData,
    loading: teamBillingDataLoading,
  } = useQuery(GET_TEAM_BILLING_INFORMATION, {
    variables: { teamId: accountId },
    client: newApiClient,
  });

  const billingInformation = get(
    teamBillingData,
    'getTeamBillingInformation.billingInformation',
  );
  const paymentMethod = get(
    teamBillingData,
    'getTeamBillingInformation.paymentMethod',
  );

  return (
    <>
      <Typography
        className={classes.title}
        variant="body1"
      >
        {t('billingDetails.title')}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
      >
        {t('billingDetails.subtitle')}
      </Typography>
      <div className={classes.paymentInformationWrapper}>
        <PaymentInformation
          paymentData={paymentMethod}
          refetchTeamBillingInfo={refetch}
          loading={loading || teamBillingDataLoading}
        />
      </div>
      <BillingInformation
        disabled={!paymentMethod}
        billingData={billingInformation}
        loading={loading || teamBillingDataLoading}
      />
    </>
  );
};

BillingDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default BillingDetails;
