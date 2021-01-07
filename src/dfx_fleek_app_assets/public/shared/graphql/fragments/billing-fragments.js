import gql from 'graphql-tag';

export const PLAN_INFO = gql`
  fragment PlanInfo on Plan {
    id
    name
    description
    priceMonthly
    priceYearly
    limitBuildTimeInMins
    limitBandwidthInMB
    limitNumberOfSites
    limitTeams
    limitTeamMembers
    extraTeamMemberPrice
  }
`;

export const PAYMENT_METHOD = gql`
  fragment PaymentInfo on PaymentMethod {
    type
    issuer
    card {
      lastCardNumbers
    }
  }
`;

export const SITES_NUMBER_LIMIT = gql`
  fragment SitesLimitBillingInfo on TeamBillingInfo {
    activePlan {
      selectedPlan {
        id
        name
        limitNumberOfSites
      }
    }
  }
`;

export const BILLING_INFO = gql`
  fragment BillingInfo on TeamBillingInfo {
    activePlan {
      currentBuildMinutesInMonth
      currentBandwidthInMonth
      # currentMemberAmount ### waiting on BE
      activatedAt
      expiresAt
      selectedPlan {
        ...PlanInfo
      }
    }
    paymentMethod {
      ...PaymentInfo
    }
    stripeCustomerId
    billingInformation {
      name
      email
    }
  }
  ${PLAN_INFO}
  ${PAYMENT_METHOD}
`;
