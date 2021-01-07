const getItems = (
  t,
  {
    buildTime = '',
    totalDeployTime = '',
    startedAt = '3:53:42PM',
    endedAt = '3:53:42PM',
  } = {},
) => ({
  title: t('sites.deploys.summaryList.title'),
  items: [
    {
      title: t('sites.deploys.summaryList.filesUploaded.title'),
      subtitle: t('sites.deploys.summaryList.filesUploaded.subtitle'),
      icon: ['fal', 'info-circle'],
    },
    {
      title: t('sites.deploys.summaryList.redirectRulesProcessed.title'),
      subtitle: t('sites.deploys.summaryList.redirectRulesProcessed.subtitle'),
      icon: ['fal', 'info-circle'],
    },
    {
      title: t('sites.deploys.summaryList.headerRulesProcessed.title'),
      subtitle: t('sites.deploys.summaryList.headerRulesProcessed.subtitle'),
      icon: ['fal', 'info-circle'],
    },
    {
      title: t('sites.deploys.summaryList.linkedResources.title'),
      subtitle: t('sites.deploys.summaryList.linkedResources.subtitle'),
      icon: ['fal', 'info-circle'],
    },
    {
      title: t('sites.deploys.summaryList.buildTime.title', { buildTime, totalDeployTime }),
      subtitle: t('sites.deploys.summaryList.buildTime.subtitle', { startedAt, endedAt }),
      icon: ['fal', 'info-circle'],
    },
  ],
});

export default getItems;
