import { url } from '@Shared';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';

const getIsSelectedChecker = (path) => (routes) => routes.some(
  (route) => !!matchPath(path, route),
);

const getConfig = ({ t, location, teamId }) => {
  const isSelected = getIsSelectedChecker(location.pathname);

  return [
    {
      id: 'sites',
      title: t('layout.sidebar.sites'),
      icon: 'window',
      component: Link,
      to: url.buildUrl(null, `/teams/${teamId}/sites`),
      disabled: false,
      selected: isSelected([
        '/teams/:teamId/sites',
        '/sites',
        '/start',
      ]),
    },
    {
      id: 'storage',
      title: t('layout.sidebar.storage'),
      icon: 'storage',
      component: Link,
      disabled: false,
      label: t('layout.sidebar.beta'),
      // teamId is the default bucket
      to: url.buildUrl(null, `/teams/${teamId}/storage/${teamId}-bucket`),
      selected: isSelected(['/teams/:teamId/storage']),
    },
    {
      id: 'billing',
      title: t('layout.sidebar.billing'),
      icon: 'credit-card',
      component: Link,
      to: url.buildUrl(null, `/teams/${teamId}/billing/general`),
      disabled: false,
      selected: isSelected([
        '/teams/:teamId/billing/general/:section?',
        '/teams/:teamId/billing/change-plan',
      ]),
    },
    {
      id: 'members',
      title: t('layout.sidebar.members'),
      icon: 'members',
      component: Link,
      disabled: false,
      to: url.buildUrl(null, `/teams/${teamId}/members`),
      selected: isSelected(['/teams/:teamId/members']),
    },
    /* {
      id: 'builds',
      title: t('layout.sidebar.builds'),
      icon: 'share',
      component: Link,
      to: '/builds',
      disabled: true,
      selected: isSelected(['/builds']),
    },
    {
      id: 'domains',
      title: t('layout.sidebar.domains'),
      icon: 'hub',
      component: Link,
      to: '/domains',
      disabled: true,
      selected: isSelected(['/domains']),
    },
    {
      id: 'team-settings',
      title: t('layout.sidebar.teamSettings'),
      icon: 'gear',
      component: Link,
      to: '/team-settings',
      disabled: true,
      selected: isSelected(['/team-settings']),
    }, */
  ];
};

export default getConfig;
