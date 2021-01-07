import { getS3Client } from '@Clients';
import * as Sentry from '@sentry/browser';
import { url as urlHelper } from '@Shared';
import { getStorageObjectPath } from '@Shared/utils';
import { copyToClipboard } from '@terminal-packages/ui/core/CopyToClipboardButton/utils';

/* eslint-disable no-console, consistent-return */
export const getSignedUrl = async (
  bucket = '',
  selectedObjects = [],
  cb = () => {},
) => {
  const object = selectedObjects[0];
  if (!object) return;

  const s3Client = await getS3Client();

  s3Client.getSignedUrl(
    'getObject',
    { Bucket: bucket, Key: object.key },
    (err, url) => cb(err, url, object),
  );
};

const open = ({
  bucket,
  selectedObjects = [],
}) => {
  const object = selectedObjects[0];
  if (!object) return;

  const url = getStorageObjectPath(bucket, object.key);

  const win = window.open(`https://${url}`, '_blank');
  win.focus();
};

const view = ({
  bucket,
  history,
  accountId,
  selectedObjects = [],
}) => {
  const object = selectedObjects[0];
  if (!object) return;

  const pathKey = object.type === 'folder' ? 'folder' : 'object';
  const objectPath = object.type === 'folder' ? object.name : object.key;

  const redirectUrl = urlHelper.buildUrl(
    null,
    `/teams/${accountId}/storage/${bucket}/${pathKey}/${objectPath}`,
  );

  history.push(redirectUrl);
};


const rename = () => {};

const download = ({
  t,
  toast,
  bucket,
  selectedObjects = [],
}) => {
  getSignedUrl(bucket, selectedObjects, (err, url, object) => {
    if (err) {
      Sentry.captureException(err);
      return console.error(err);
    }

    toast.success(t('storage.actionsMessage.downloadSuccess'), { autoClose: 6000 });

    fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        const objectUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.style.display = 'none';
        a.download = object.name;
        a.href = objectUrl;

        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(a);
      })
      .catch((fetchErr) => {
        Sentry.captureException(fetchErr);
      });
  });
};

const copyPath = ({
  t,
  toast,
  bucket,
  selectedObjects = [],
}) => {
  const object = selectedObjects[0];
  if (!object) return;

  const url = getStorageObjectPath(bucket, object.key);

  copyToClipboard(`https://${url}`);
  toast.success(t('storage.actionsMessage.copyPathSuccess'));
};

const downloadAs = () => {};

export default {
  open,
  view,
  rename,
  download,
  'copy-path': copyPath,
  'download-as': downloadAs,
};
