import { HttpLink } from '@apollo/client';

import config from '../../../config';

export default new HttpLink({
  uri: config.oldApi.baseURL,
});
