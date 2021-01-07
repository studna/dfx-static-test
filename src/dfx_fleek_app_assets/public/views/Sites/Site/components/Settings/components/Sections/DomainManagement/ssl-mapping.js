import get from 'lodash/get';
import moment from 'moment';

const getSslStatus = (sslInfo) => {
  const sslError = get(sslInfo, 'error');
  let status = 'waiting';
  if (sslInfo) {
    status = 'success';
  }
  if (sslError) {
    status = 'error';
  }
  return status;
};

const ssl = (sslInfo, t) => {
  const sslType = get(sslInfo, 'type', 'CLOUDFLARE');
  const status = getSslStatus(sslInfo);
  const errorMsg = get(sslInfo, 'error');
  const createdAt = get(sslInfo, 'createdAt');
  const created = moment(createdAt).format('MMM DD, YYYY');
  const expiresAt = get(sslInfo, 'expiresAt');
  const expires = moment(expiresAt).format('MMM DD, YYYY');

  return ({
    certificate: t(`sites.overview.ssl.${sslType}`),
    status,
    expires,
    errorMsg,
    created,
  });
};

export default ssl;
