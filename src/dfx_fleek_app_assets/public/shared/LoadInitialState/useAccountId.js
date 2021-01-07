import qs from 'query-string';
import { useLocation } from 'react-router';

const useAccountId = () => {
  const location = useLocation();

  const queryParams = qs.parse(location.search);
  const { accountId = null } = queryParams;

  if (accountId === 'undefined' || accountId === 'null') return null;
  return accountId;
};

export default useAccountId;
