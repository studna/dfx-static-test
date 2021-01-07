import get from 'lodash/get';
import { billing } from '@Shared';

const getLimitAndText = (t, limitNumber, transSuffix) => {
  const limitValue = billing.getUnlimitedOrValue(t, limitNumber);
  const limit = limitValue.wasConverted
    ? limitValue.value.toLowerCase()
    : t('billing.changePlan.step2Payment.upTo', {
      limit: limitValue.value,
    });
  const text = !limitValue.wasConverted && limitValue.value === 1
    ? t(`billing.changePlan.step2Payment.${transSuffix}Singular`)
    : t(`billing.changePlan.step2Payment.${transSuffix}Plural`);

  return { limit, text };
};

// eslint-disable-next-line import/prefer-default-export
export const getSummaryPlanType = (t, selectedPlan) => {
  const planType = t('billing.changePlan.step2Payment.typePlan', {
    type: selectedPlan.name,
  });

  const limitOfMembers = get(selectedPlan, 'limitTeamMembers', 0);

  const siteInfo = getLimitAndText(t, selectedPlan.limitNumberOfSites, 'site');
  const userInfo = getLimitAndText(t, limitOfMembers, 'user');

  return (
    t('billing.changePlan.step2Payment.including', {
      plan: planType,
      siteLimit: siteInfo.limit,
      sitesText: siteInfo.text,
      userLimit: userInfo.limit,
      usersText: userInfo.text,
    })
  );
};
