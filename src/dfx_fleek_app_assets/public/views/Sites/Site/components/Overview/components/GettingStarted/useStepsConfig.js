import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import get from 'lodash/get';
import { url } from '@Shared';
import { DOMAIN_STATUS, DOMAIN_TYPE, GA_EVENTS_CATEGORIES } from '~/constants';

const useStepsConfig = (siteBySlug) => {
  const isFirstStepDone = !!get(siteBySlug, 'data.getSiteBySlug.publishedDeploy');
  const siteId = get(siteBySlug, 'data.getSiteBySlug.id', []);
  const domains = get(siteBySlug, 'data.getSiteBySlug.domains', []);
  const propagatedDomains = domains.filter(
    ({ status }) => status === DOMAIN_STATUS.PROPAGATED,
  );
  const nonPropagatedDomains = domains.filter(
    ({ status }) => status === DOMAIN_STATUS.PENDING_PROPAGATION,
  );
  const primaryDomain = domains.find(
    ({ type }) => type === DOMAIN_TYPE.PRIMARY,
  );
  const lastDeployId = get(siteBySlug, 'data.getSiteBySlug.latestDeploy.id');
  const isSecondStepDone = propagatedDomains.length > 1;
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useRouteMatch();
  const firstStepTransKey = isFirstStepDone ? 'done' : 'instruction';
  const secondStepTransKey = isSecondStepDone ? 'done' : 'instruction';

  const secondStepButtonText = (nonPropagatedDomains.length > 0 && isFirstStepDone) ? t('sitesGettingStarted.secondStep.instruction.verifyDomainButtonText') : t('sitesGettingStarted.secondStep.instruction.addDomainButtonText');

  return [
    {
      orderNumber: 1,
      title: t(`sitesGettingStarted.firstStep.${firstStepTransKey}.title`),
      isCogIcon: !isFirstStepDone,
      subtitle: t(`sitesGettingStarted.firstStep.${firstStepTransKey}.subtitle`),
      buttonText: !isFirstStepDone
        ? t('sitesGettingStarted.firstStep.instruction.buttonText')
        : undefined,
      buttonCallback: () => history.push(
        url.buildUrl(null, `/sites/${params.siteSlug}/deploys/${lastDeployId}`),
      ),
      isStepDisabled: false,
      isDone: isFirstStepDone,
    },
    {
      orderNumber: 2,
      title: t(`sitesGettingStarted.secondStep.${secondStepTransKey}.title`),
      subtitle: t(
        `sitesGettingStarted.secondStep.${secondStepTransKey}.subtitle`,
        { domainName: primaryDomain ? primaryDomain.name : '' },
      ),
      buttonText: !isSecondStepDone
        ? secondStepButtonText
        : undefined,
      buttonCallback: () => {
        if (nonPropagatedDomains.length > 0) {
          return history.push(
            url.buildUrl(null, `/sites/${params.siteSlug}/settings/domain-management`),
          );
        }

        window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Add custom domain from Overview');
        window.analytics.track('Add custom domain from Overview', {
          siteId,
          teamId: url.getAccountIdFromUrl(),
        });

        return history.push(
          url.buildUrl(null, `/sites/${params.siteSlug}/add-domain`),
        );
      },
      isStepDisabled: !isFirstStepDone,
      isDone: isSecondStepDone,
    },
  ];
};

export default useStepsConfig;
