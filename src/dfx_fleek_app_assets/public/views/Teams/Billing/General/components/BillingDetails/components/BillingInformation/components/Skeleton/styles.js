import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  wrapper: {
    marginTop: 13,
    marginLeft: 21,
  },
  tag: {
    display: 'inline-block',
    width: 190,
  },
  value: {
    display: 'inline-block',
  },
  firstLineWrapper: {
    marginBottom: 22,
  },
  secondLineWrapper: {
    marginBottom: 12,
  },
}));
