import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const getFormattedDate = (rawDate, t) => {
  const momentDate = moment.utc(rawDate);

  const currentDayNumber = moment().format('DD');
  const targetDayNumber = momentDate.local().format('DD');

  const isSameDayNumber = currentDayNumber === targetDayNumber;
  const isLessThanADayOld = moment().diff(momentDate, 'days') <= 1;
  const dayAndMonth = (isSameDayNumber && isLessThanADayOld)
    ? t('common.today')
    : momentDate.local().format('MMM DD');
  const hourAndMinute = momentDate.format('LT');

  return t(
    'sites.tabs.deploys.sections.deployInfo.listOfDeploys.deployItem.startDeployTime',
    { dayAndMonth, hourAndMinute },
  );
};
