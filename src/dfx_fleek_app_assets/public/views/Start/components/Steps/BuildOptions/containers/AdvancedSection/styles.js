import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  title: {
    fontWeight: 500,
  },
  envVarsListWrapper: {
    margin: '25px 0 35px',
  },
  inputErrorWrapper: {
    '& p': {
      position: 'absolute',
    },
  },
}));
