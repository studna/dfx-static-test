import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  icon: {
    display: 'flex',
    fontSize: 12,
  },
  button: {
    '&&& *': {
      color: theme.palette.palette.grey2,
    },
    minWidth: 'unset',
    padding: 0,
    height: 20,
    marginBottom: 10,
    '&&& span': {
      height: 10,
    },
  },
  backButtonText: {
    marginLeft: 10,
  },
}));
