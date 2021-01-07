import buildUrl from './build-url';
import getAccountIdFromUrl from './get-account-id-from-url';
import getUnlimitedOrValue from './get-unlimited-or-value';
import getDollarsFromCents from './get-dollars-from-cents';

export { default as getMainDomain } from './get-main-domain';
export { default as getSiteName } from './get-site-name';
export { default as getSiteDateText } from './get-site-date-text';
export { default as getGithubRepositoryData } from './get-github-repository-data';
export { default as getCustomDateFormat } from './get-custom-date-format';
export { default as getOlderItem } from './get-older-item';
export { default as formatBytes } from './format-bytes';
export { default as getFileType } from './get-file-type';
export { default as shortenEthAddress } from './shorten-eth-address';
export { default as getStorageObjectPath } from './get-storage-object-path';
export { default as getDeployLabel } from './get-deploy-label';
export { default as getGatewayUrl } from './get-gateway-url';

export const url = {
  buildUrl,
  getAccountIdFromUrl,
};

export const billing = {
  getUnlimitedOrValue,
  getDollarsFromCents,
};
