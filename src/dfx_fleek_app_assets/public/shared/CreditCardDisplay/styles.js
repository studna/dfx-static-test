import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.palette.palette.black,
    fontSize: 15,
  },
  creditCardIcon: {
    marginRight: 8,
    maxHeight: 23,
    maxWidth: 25,
  },
  boldText: {
    fontWeight: 500,
  },
}));
