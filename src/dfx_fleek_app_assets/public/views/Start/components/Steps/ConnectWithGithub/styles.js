import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  buttonContainer: {
    width: 284,
    // Safari button fix
    '&&& > button span': {
      height: 18,
    },
  },
  icon: {
    display: 'flex',
  },
  buttonText: {
    marginLeft: 10,
  },
  button: {
    minWidth: 240,
  },
});
