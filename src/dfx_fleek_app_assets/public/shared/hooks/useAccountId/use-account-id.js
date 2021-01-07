import { useLocation } from 'react-router';

import { url } from '@Shared';

const useAccountId = () => {
  const location = useLocation();
  const accountId = url.getAccountIdFromUrl(location);

  return accountId;
};

export default useAccountId;
