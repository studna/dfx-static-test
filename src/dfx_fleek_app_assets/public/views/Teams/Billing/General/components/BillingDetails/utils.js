import { GET_TEAM_BILLING_INFORMATION } from '@Shared/graphql/queries';

// eslint-disable-next-line import/prefer-default-export
export const updateBillingInformationCache = (teamId, values) => (cache) => {
  try {
    const cacheData = cache.readQuery({
      query: GET_TEAM_BILLING_INFORMATION,
      variables: { teamId },
    });

    const newBillingInformationData = {
      ...cacheData,
      getTeamBillingInformation: {
        ...cacheData.getTeamBillingInformation,
        billingInformation: {
          ...cacheData.billingInformation,
          ...values,
        },
      },
    };

    cache.writeQuery({
      query: GET_TEAM_BILLING_INFORMATION,
      variables: { teamId },
      data: newBillingInformationData,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('Update cache of billing information', error);
  }
};
