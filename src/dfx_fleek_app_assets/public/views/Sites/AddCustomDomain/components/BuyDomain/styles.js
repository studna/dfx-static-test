import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  textContainer: {
    minWidth: 650,
    '& > h6': {
      marginBottom: 6,
    },
  },
  detail: {
    color: theme.palette.palette.grey2,
  },
  ctaSection: {
    marginTop: 20,
  },
  buyButton: {
    minWidth: 228,
    display: 'block',
    marginBottom: 40,
    color: theme.palette.palette.white,
  },
  addDomainButton: {
    marginRight: 15,
  },
  paymentMethodDetail: {
    display: 'flex',
  },
  addPaymentButton: {
    marginLeft: 20,
  },
  paymentContainer: {
    marginTop: 15,
    '& > p': {
      marginBottom: 10,
    },
  },
  noPaymentMethod: {
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    marginBottom: 4,
  },
}));
