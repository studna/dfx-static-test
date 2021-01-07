const presenter = (t) => ({
  clientSecret: '',
  i18n: {
    title: t('modals.paymentMethod.title'),
    inputs: {
      name: {
        label: t('modals.paymentMethod.form.inputs.name.label'),
        placeholder: t('modals.paymentMethod.form.inputs.name.placeholder'),
      },
      country: {
        label: t('modals.paymentMethod.form.inputs.country.label'),
        placeholder: t('modals.paymentMethod.form.inputs.country.placeholder'),
      },
      cta: t('modals.paymentMethod.form.inputs.cta'),
    },
    error: {
      title: t('modals.paymentMethod.form.errors.title'),
      name: t('modals.paymentMethod.form.errors.name'),
      country: t('modals.paymentMethod.form.errors.country'),
      card: t('modals.paymentMethod.form.errors.card'),
      internal: t('modals.paymentMethod.form.errors.internal'),
    },
  },
});

export default presenter;
