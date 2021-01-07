import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    color: theme.palette.palette.black,
    fontSize: 22,
    fontWeight: 500,
    marginBottom: 2,
  },
  subTitle: {
    color: theme.palette.palette.grey2,
    frontSize: 15,
    marginBottom: 9,
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
  blackColor: {
    color: theme.palette.palette.black,
  },
}));
