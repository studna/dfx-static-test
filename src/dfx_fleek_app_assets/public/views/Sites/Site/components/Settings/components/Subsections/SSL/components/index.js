import Success from './Success';
import Error from './Error';
import Waiting from './Waiting';
import NotDeployed from './NotDeployed';

export default {
  success: Success,
  waiting: Waiting,
  error: Error,
  default: Error,
  not_deployed: NotDeployed,
};
