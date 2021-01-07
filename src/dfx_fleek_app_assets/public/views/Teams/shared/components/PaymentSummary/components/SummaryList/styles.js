import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
  additionText: {
    fontSize: 15,
    color: theme.palette.palette.black,
  },
  totalText: {
    fontSize: 15,
    color: theme.palette.palette.black,
    fontWeight: 500,
  },
  billLineContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 22px',
    height: 46,
  },
}));
