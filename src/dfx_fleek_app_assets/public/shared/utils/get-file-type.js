import { ARCHIVE_REGEX } from '~/views/Teams/Storage/constants';

const getFileType = (filePath) => {
  if (ARCHIVE_REGEX.test(filePath)) {
    return 'archive';
  }
  if (filePath[0] === '/') {
    return 'folder';
  }
  return 'file';
};

export default getFileType;
