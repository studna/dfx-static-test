const i18n = (t) => ({
  domains: {
    title: t('sites.tabs.settings.domains.title'),
    paragraph: t('sites.tabs.settings.domains.paragraph'),
  },
  customDomains: {
    boxContent: {
      title: t('sites.tabs.settings.customDomains.title'),
      paragraph: t('sites.tabs.settings.customDomains.paragraph'),
      buttonText: t('sites.tabs.settings.customDomains.buttonText'),
      learnAboutCustomDomains: t('sites.tabs.settings.customDomains.learnAboutCustomDomains'),
      learnAboutRedirect: t('sites.tabs.settings.customDomains.learnAboutRedirect'),
      waitingOnDNS: t('sites.tabs.settings.customDomains.waitingOnDNS'),
      checkDNS: t('sites.tabs.settings.customDomains.checkDNS'),
      terminalDNS: t('sites.tabs.settings.customDomains.terminalDNS'),
    },
    defaultSubdomain: t('sites.tabs.settings.customDomains.defaultSubdomain'),
    primaryDomain: t('sites.tabs.settings.customDomains.primaryDomain'),
    redirectsAutomatically: t('sites.tabs.settings.customDomains.redirectsAutomatically'),

  },
  ens: {
    title: t('sites.tabs.settings.ens.title'),
    paragraph: t('sites.tabs.settings.ens.paragraph'),
  },
  http: {
    title: t('sites.tabs.settings.http.title'),
    paragraph: t('sites.tabs.settings.http.paragraph'),
  },
  ssl: {
    title: t('sites.tabs.settings.ssl.title'),
    errorParagraph: t('sites.tabs.settings.ssl.errorParagraph'),
    buttonText: t('sites.tabs.settings.ssl.buttonText'),
    errorlink: t('sites.tabs.settings.ssl.errorlink'),
    error: t('sites.tabs.settings.ssl.error'),
    waiting: t('sites.tabs.settings.ssl.waiting'),
    waitingParagraph: t('sites.tabs.settings.ssl.waitingParagraph'),
    httpEnabled: t('sites.tabs.settings.ssl.httpEnabled'),
    certificate: t('sites.tabs.settings.ssl.certificate'),
    domains: t('sites.tabs.settings.ssl.domains'),
    expires: t('sites.tabs.settings.ssl.expires'),
    created: t('sites.tabs.settings.ssl.created'),
    notDeployed: t('sites.tabs.settings.ssl.notDeployed'),
    notDeployedParagraph: t('sites.tabs.settings.ssl.notDeployedParagraph'),
  },
});

export default i18n;
