const billingInfoMockData = {
  getTeamBillingInformation: {
    activePlan: {
      currentBuildMinutesInMonth: '10',
      currentBandwidthInMonth: '10',
      activatedAt: '2019-12-12T00:05:45.466Z',
      expiresAt: '2020-01-19T00:05:45.466Z',
      selectedPlan: {
        id: 'business',
        name: 'business',
        description: 'pro plan',
        priceMonthly: '49.99',
        priceYearly: '600.00',
        limitBandwidthInMB: '300',
        limitBuildTimeInMins: '500',
      },
    },
    stripeCustomerId: 'stripeId',
    paymentMethod: {
      type: 'CARD',
      issuer: 'VISA',
      lastCardNumbers: '4444',
    },
    billingInformation: {
      name: 'Royce Moroch',
      email: 'morochroyce@gmail.com',
    },
  },
};

export default billingInfoMockData;
