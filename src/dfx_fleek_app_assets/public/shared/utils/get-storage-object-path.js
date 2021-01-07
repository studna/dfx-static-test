import config from '~/config';

/**
 *
 * @param {string} bucket bucket name
 * @param {string} restOfPath path to the object
 * @return {string} full object path
 */
const getStorageObjectPath = (bucketName, restOfPath = '') => (
  `${bucketName}.${config.storageIPFSGateway}/${restOfPath}`
);

export default getStorageObjectPath;
