import moment from 'moment';

const getDate = (t, rawDate) => {
  const momentDate = moment.utc(rawDate);

  const currentDayNumber = moment().format('DD');
  const targetDayNumber = momentDate.local().format('DD');

  const isSameDayNumber = currentDayNumber === targetDayNumber;
  const isLessThanADayOld = moment().diff(momentDate, 'days') <= 1;
  const showHourOnly = isSameDayNumber && isLessThanADayOld;

  return showHourOnly
    ? ` ${t('common.at')} ${momentDate.format('LT')}`
    : `${t('common.on')} ${momentDate.format('MMM DD')}`;
};

const getSiteDateText = (t, { isPublished, createdAt, lastPublishAt }) => {
  if (isPublished) {
    return `${t('sites.lastPublished')} ${getDate(t, lastPublishAt)}`;
  }
  return `${t('common.created')} ${getDate(t, createdAt)}`;
};

export default getSiteDateText;
