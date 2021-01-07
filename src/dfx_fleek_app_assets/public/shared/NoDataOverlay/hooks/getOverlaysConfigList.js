import React from 'react';
import getAccountIdFromUrl from '@Shared/utils/get-account-id-from-url';
import { OVERLAY_TYPES } from '../constants';
import manOnBrowserBackgroundSvg from '../images/man-on-browser-background.svg';

const getImageComponent = (src) => (
  ({ className }) => (
    <img className={className} src={src} alt="" />
  )
);

const getOverlaysConfig = ({ history, classes }) => ({
  [OVERLAY_TYPES.SITES_LIST]: {
    ImageComponent: getImageComponent(manOnBrowserBackgroundSvg),
    transKeys: {
      title: 'noDataInfo.sitesList.title',
      subtitle: 'noDataInfo.sitesList.subtitle',
      description: 'noDataInfo.sitesList.description',
      goToDocs: 'noDataInfo.sitesList.goToDocs',
      buttonText: 'noDataInfo.sitesList.buttonText',
    },
    link: 'https://docs.fleek.co/hosting/overview/',
    onClickButton: () => history.push(`/start/connect-repository?accountId=${getAccountIdFromUrl()}`),
    overrideClasses: {
      description: classes.thinnerDescription,
    },
  },
});

export default getOverlaysConfig;
