import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    paddingBottom: 30,
    position: 'relative',
  },
  textInput: {
    maxWidth: 320,
    marginLeft: 15,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  iconContainer: {
    marginLeft: 18,
    '& > div': {
      display: 'flex',
      fontSize: 15,
    },
  },
  errorMessage: {
    position: 'absolute',
    top: 25,
    left: 2,
    color: theme.palette.palette.errorRed,
  },
}));
