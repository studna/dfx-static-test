import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontWidth: 600,
  },
  accentInfo: {
    margin: '3px 0 4px',
    color: theme.palette.palette.yellowPending,
  },
  confirmButton: {
    marginTop: 20,
  },
}));
