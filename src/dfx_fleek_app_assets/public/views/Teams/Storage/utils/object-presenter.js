import get from 'lodash/get';
import { formatBytes } from '@Shared';
import { ARCHIVE_REGEX } from '~/views/Teams/Storage/constants';

const objectPresenter = (obj = {}, bucket = '') => {
  const key = get(obj, 'Key', '');
  const path = key.split('/');

  const isFolder = path[path.length - 1] === '';
  const name = path.filter((val) => val !== '').pop() || '';

  const type = isFolder ? 'folder' : 'file';
  const subtype = !isFolder && ARCHIVE_REGEX.test(name)
    ? 'archive'
    : type;

  const lastModified = new Date(get(obj, 'LastModified'));

  const size = get(obj, 'Size', 0);
  const bytesSize = isFolder
    ? '--'
    : formatBytes(size);

  return {
    key,
    type,
    name,
    size,
    bucket,
    subtype,
    bytesSize,
    lastModified,
    selected: false,
    eTag: get(obj, 'ETag'),
    fullKey: `${bucket}/${key}`,
  };
};

export default objectPresenter;
