import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontSize: 21,
    fontWeight: 500,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: theme.palette.palette.grey2,
    lineHeight: 1.25,
    letterSpacing: 0,
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
  link: {
    marginTop: 10,
    marginBottom: 21,
    color: theme.palette.palette.primaryBlue,
  },
}));
