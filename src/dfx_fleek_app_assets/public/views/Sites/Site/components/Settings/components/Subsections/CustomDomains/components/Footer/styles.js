import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  footer: {
    margin: '10px 20px 20px 20px',
  },
  link: {
    color: theme.palette.palette.primaryBlue,
    display: 'inline-flex',
    textDecoration: 'none',
  },
  docs: {
    padding: 0,
    color: theme.palette.palette.primaryBlue,
    marginRight: 5,
  },
  arrowIcon: {
    display: 'flex',
    fontSize: 15,
    marginLeft: 5,
    color: theme.palette.palette.primaryBlue,
  },
  linkStyleReset: {
    textDecoration: 'none',
  },
  button: {
    marginTop: 10,
  },
}));
