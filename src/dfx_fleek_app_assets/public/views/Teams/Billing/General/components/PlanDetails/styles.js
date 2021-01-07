import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  header: {
    padding: '5px 0 16px 0',
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 17,
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
  button: {
    margin: '19px 0px',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '10px 0px 13px',
  },
  planTypeContainer: {
    flexBasis: 290,
  },
  pricingContainer: {
    flexGrow: 1,
    textAlign: 'right',
  },
  pricingText: {
    fontWeight: 500,
  },
  mainText: {
    color: theme.palette.palette.black,
    fontSize: 15,
  },
  subText: {
    color: theme.palette.palette.grey2,
    fontSize: 13,
  },
}));
