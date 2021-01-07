import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  planInfoContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 17,
    color: theme.palette.palette.black,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 15,
    color: theme.palette.palette.grey2,
    marginTop: -3,
  },
}));
