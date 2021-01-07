import get from 'lodash/get';
import S3 from 'aws-sdk/clients/s3';
import * as Sentry from '@sentry/browser';

import { GENERATE_TEMP_API_KEY } from '@Shared/graphql/mutations';

import config from '../../config';
import newApiClient from '../new-api';

let s3;

const getS3Client = async () => {
  // check if s3 is created
  if (s3 && s3.config.credentials.accessKeyId.length) {
    return s3;
  }

  // get credentials to create s3Client

  let accessKeyId = '';
  let sessionToken = '';
  let secretAccessKey = '';

  try {
    const { data } = await newApiClient.mutate({
      mutation: GENERATE_TEMP_API_KEY,
    });

    accessKeyId = get(data, 'generateTempApiKey.key', '');
    secretAccessKey = get(data, 'generateTempApiKey.secret', '');
    sessionToken = get(data, 'generateTempApiKey.sessionToken', '');
  } catch (error) {
    Sentry.captureException(error);
    // eslint-disable-next-line no-console
    console.log('Error when trying to get the aws credentials: ', error.message);
  }

  s3 = new S3({
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    endpoint: config.s3Client.baseURL,
    credentials: {
      accessKeyId,
      sessionToken,
      secretAccessKey,
    },
  });

  return s3;
};

export default getS3Client;
