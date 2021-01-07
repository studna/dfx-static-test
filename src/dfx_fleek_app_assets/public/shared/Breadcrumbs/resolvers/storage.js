import { matchPath } from 'react-router-dom';
import get from 'lodash/get';
import { url } from '@Shared';

export const storageRoot = (props) => {
  const { t, location } = props;
  const match = matchPath(location.pathname, '/teams/:teamId/storage/');
  const teamId = get(match, 'params.teamId', '');

  return {
    items: [{
      type: 'icon',
      enabled: true,
      title: t('storage.title'),
      icon: ['fal', 'hdd'],
      to: url.buildUrl(null, `/teams/${teamId}/storage`),
    }],
  };
};

export const storageBucket = (props) => {
  const { location } = props;
  const match = matchPath(location.pathname, '/teams/:teamId/storage/:bucketName');
  const { teamId, bucketName } = get(match, 'params', {});

  return {
    items: [{
      type: 'text',
      enabled: true,
      title: bucketName,
      to: url.buildUrl(null, `/teams/${teamId}/storage/${bucketName}`),
    }],
  };
};

export const storageItemPath = (props) => {
  const { location } = props;
  const objectMatch = matchPath(location.pathname, '/teams/:teamId/storage/:bucketName/object/*');
  const folderMatch = matchPath(location.pathname, '/teams/:teamId/storage/:bucketName/folder/*');

  const match = objectMatch || folderMatch || { params: {} };
  const { 0: storagePath, teamId, bucketName } = match.params;
  const lastItemType = objectMatch ? 'object' : 'folder';
  const foldersNames = storagePath ? storagePath.split('/') : [];

  const foldersItems = foldersNames.map((folderName, index) => {
    const type = index === foldersNames.length - 1 ? lastItemType : 'folder';
    const storageUrlPath = foldersNames.slice(0, index + 1).join('/');

    return {
      type: 'text',
      enabled: true,
      title: folderName,
      to: url.buildUrl(
        null,
        `/teams/${teamId}/storage/${bucketName}/${type}/${storageUrlPath}`,
      ),
    };
  });

  return {
    items: foldersItems,
  };
};
