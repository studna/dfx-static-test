import { useEffect } from 'react';

import auth from '../../auth';

const SignUp = () => {
  useEffect(() => {
    auth.authenticate(null, 'signup');
  }, []);

  return null;
};

export default SignUp;
