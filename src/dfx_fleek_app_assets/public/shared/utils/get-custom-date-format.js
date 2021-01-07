import moment from 'moment';

const getCustomDateFormat = (rawDate, format = 'MMM DD', calendar = false) => {
  if (!rawDate) return '';
  const momentDate = moment(rawDate);
  return calendar ? momentDate.calendar() : momentDate.format(format);
};

export default getCustomDateFormat;
