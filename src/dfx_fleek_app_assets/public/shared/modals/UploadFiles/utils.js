import get from 'lodash/get';

// eslint-disable-next-line import/prefer-default-export
export const getFilesVisualRepresentation = (files, t) => (
  files.reduce((result, file) => {
    if (file.path.startsWith('/')) {
      const [, rootFolder] = file.path.split('/');
      const rootFolderName = `/${rootFolder}`;
      const fileLabel = file.uploaded && t('modals.uploadFiles.uploaded');
      const folderData = get(result, rootFolderName, {
        size: 0,
        label: get(files, '0.label', fileLabel),
      });

      return {
        ...result,
        [rootFolderName]: {
          size: file.size + folderData.size,
          label: folderData.label !== fileLabel
            ? t('modals.uploadFiles.partiallyUploaded')
            : fileLabel,
        },
      };
    }
    return {
      ...result,
      [file.name]: {
        size: file.size,
        label: file.uploaded && t('modals.uploadFiles.uploaded'),
      },
    };
  }, {})
);
