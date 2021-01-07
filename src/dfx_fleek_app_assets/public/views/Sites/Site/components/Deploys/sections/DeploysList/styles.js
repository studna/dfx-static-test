import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  deployItem: {
    marginBottom: 15,
    cursor: 'pointer',
  },
  alert: {
    marginBottom: 15,
  },
}));
