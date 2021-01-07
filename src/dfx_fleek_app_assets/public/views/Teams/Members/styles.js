import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({
  buttonContainer: {
    marginBottom: 23,
    alignSelf: 'flex-end',
    paddingRight: 27,
  },
  linkButton: {
    textDecoration: 'none',
  },
  linkButtonDisabled: {
    pointerEvents: 'none',
  },
  alertRoot: {
    margin: '5px 25px 0px 25px',
  },
}));
