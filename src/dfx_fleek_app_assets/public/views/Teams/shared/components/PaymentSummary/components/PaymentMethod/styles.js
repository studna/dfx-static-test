import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontSize: 17,
    color: theme.palette.palette.black,
    fontWeight: 500,
  },
  creditCardInfoContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0 17px',
  },
  addPaymentBtn: {
    marginLeft: 10,
  },
}));
