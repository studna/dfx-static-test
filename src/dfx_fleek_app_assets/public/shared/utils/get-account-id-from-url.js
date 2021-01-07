import qs from 'query-string';

const getAccountIdFromUrl = (location = {}) => {
  let queryString = location.search || window.location.search;
  if (!queryString || queryString === '') {
    queryString = window.location.href.split('?')[1] || '';
  }

  const queryParams = qs.parse(queryString);
  const { accountId = null } = queryParams;

  if (accountId === 'undefined' || accountId === 'null') return null;

  return accountId;
};

export default getAccountIdFromUrl;
