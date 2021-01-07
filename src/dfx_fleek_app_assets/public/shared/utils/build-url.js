import qs from 'query-string';
import omit from 'lodash/omit';

const getQueryParamsObject = (queryParams) => {
  if (!queryParams) return {};
  if (typeof queryParams === 'object') return queryParams;
  if (typeof queryParams === 'string') return qs.parse(queryParams);
  return {};
};

const buildUrl = (queryParams, url, omitQs = []) => {
  const currentQs = qs.parse(window.location.href.split('?')[1] || '');
  const qsObject = getQueryParamsObject(queryParams);

  const query = {
    ...currentQs,
    ...qsObject,
  };

  const defaultUrl = qs.parseUrl(window.location.hash.substr(1)).url;

  return qs.stringifyUrl({
    url: url || defaultUrl,
    query: omit(query, omitQs),
  });
};

export default buildUrl;
