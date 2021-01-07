const i18n = (t) => ({
  title: t('billing.changePlan.pickPlan.title'),
  subtitle: t('billing.changePlan.pickPlan.subtitle'),
  plans: {
    title: (plan) => t('billing.changePlan.pickPlan.plans.title', { ...plan }),
    pickPlan: t('billing.changePlan.pickPlan.plans.pickPlan'),
    contactSales: t('billing.changePlan.pickPlan.plans.contactSales'),
    currentPlan: t('billing.changePlan.pickPlan.plans.currentPlan'),
    perMonth: (price) => t('billing.changePlan.pickPlan.plans.perMonth', { price }),
  },
});

export default i18n;
