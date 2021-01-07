import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import EditableList from '@Shared/EditableList';
import { newApiClient } from '@Clients';

import { updateBillingInformationCache } from '../../utils';
import { UPDATE_BILLING_INFO } from '../../../../../graphql/mutations';
import Skeleton from './components/Skeleton';
import useStyles from './styles';

const PaymentInformation = ({ billingData, disabled, loading }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { params } = useRouteMatch();

  const [updateBillingInfo] = useMutation(
    UPDATE_BILLING_INFO,
    { client: newApiClient },
  );

  const onSubmitChanges = async (values) => {
    try {
      await updateBillingInfo({
        variables: {
          input: {
            teamId: params.teamId,
            name: values.name,
            email: values.email,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          editBuildSettings: {
            id: params.teamId,
            __typename: 'Team',
          },
        },
        update: updateBillingInformationCache(params.teamId, values),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error update bulling information:', error.message);
    }
  };

  const data = [
    {
      stateKey: 'name',
      label: t('billingDetails.billingInformation.name'),
      value: get(billingData, 'name', ''),
      placeholder: t('billingDetails.billingInformation.placeholder'),
    },
    {
      stateKey: 'email',
      label: t('billingDetails.billingInformation.email'),
      value: get(billingData, 'email', ''),
      placeholder: t('billingDetails.billingInformation.placeholder'),
    },
  ];

  const getContent = () => {
    if (loading) {
      return (
        <>
          <Skeleton />
          <EditableList
            data={[]}
            disabled={loading}
            goToEditButtonText={t('common.edit')}
            goToEditButtonClass={classes.goToEditButton}
          />
        </>
      );
    }

    return (
      <EditableList
        data={data}
        disabled={disabled}
        goToEditButtonText={t('common.edit')}
        goToEditButtonClass={classes.goToEditButton}
        onSubmitChanges={onSubmitChanges}
      />
    );
  };

  return (
    <CardTitled
      mainContent={t('billingDetails.billingInformation.title')}
      classes={{ content: classes.root }}
    >
      {getContent()}
    </CardTitled>
  );
};

PaymentInformation.defaultProps = {
  disabled: false,
  billingData: {
    name: '',
    email: '',
  },
};

PaymentInformation.propTypes = {
  disabled: PropTypes.bool,
  billingData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
};

export default PaymentInformation;
