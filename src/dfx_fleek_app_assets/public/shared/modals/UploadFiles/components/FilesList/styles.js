import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    minHeight: 150,
    maxHeight: 'calc(100vh - 350px)',
    overflow: 'auto',
    marginTop: 11,
  },
  buttons: {
    display: 'flex',
    margin: '18px 18px 0',
  },
  cancelBtn: {
    margin: '0 10px 0 auto',
  },
}));
