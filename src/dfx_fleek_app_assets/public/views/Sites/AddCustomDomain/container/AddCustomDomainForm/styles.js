import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    marginBottom: 2,
  },
  link: {
    margin: '10px 0 23px',
    textDecoration: 'none',
  },
  purchaseTitle: {
    margin: '21px 0 6px',
  },
  accentInfo: {
    color: theme.palette.palette.yellowPending,
  },
  purchaseDescription: {
    margin: '7px 0 20px',
  },
}));
