import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  firstRowWrapper: {
    marginBottom: 3,
  },
  secondRowWrapper: {
    marginBottom: 7,
  },
  plan: {
    display: 'inline-block',
    width: 280,
  },
  bandwidth: {
    display: 'inline-block',
    width: 350,
  },
  price: {
    display: 'inline-block',
  },
  planDate: {
    display: 'inline-block',
    width: 280,
  },
  buildMinutes: {
    display: 'inline-block',
  },
}));
