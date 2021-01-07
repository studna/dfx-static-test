import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  info: {
    display: 'inline-block',
    width: 190,
  },
  creditCardNumber: {
    display: 'inline-block',
  },
  lineWrapper: {
    marginBottom: -9,
  },
}));
