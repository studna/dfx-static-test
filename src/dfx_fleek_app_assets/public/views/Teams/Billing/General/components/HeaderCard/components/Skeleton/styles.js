import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  title: {
    marginBottom: 16,
  },
  billingDate: {
    marginBottom: 15,
  },
}));
