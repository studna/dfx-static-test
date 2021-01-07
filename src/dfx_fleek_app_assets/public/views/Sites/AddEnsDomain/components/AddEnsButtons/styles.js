import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    height: 38,
  },
  cancelBtn: {
    marginLeft: 10,
  },
  errorBox: {
    backgroundColor: theme.palette.palette.lightErrorRed,
    color: theme.palette.palette.saturatedRed,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
}));
