import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontSize: 21,
    fontWeight: 500,
    marginBottom: 5,
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
  link: {
    marginTop: 10,
    marginBottom: 21,
    color: theme.palette.palette.primaryBlue,
    textDecoration: 'none',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    minWidth: 330,
  },
  chipContainer: {
    marginBottom: 16,
  },
}));
