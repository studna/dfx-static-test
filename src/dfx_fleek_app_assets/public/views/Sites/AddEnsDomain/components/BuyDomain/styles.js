import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontSize: 21,
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: theme.palette.palette.grey2,
    marginBottom: 27,
  },
  link: {
    textDecoration: 'none',
    marginBottom: 32,
  },
}));
