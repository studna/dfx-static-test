import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    padding: '15px 20px 15px 17px',
  },
  leftPart: {
    flexGrow: 1,
  },
  rightPart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 50,
  },
  icon: {
    display: 'flex',
    color: theme.palette.palette.grey2,
    fontSize: 8,
    marginLeft: 16,
  },
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  titleSkeleton: {
    display: 'inline-block',
  },
  chipSkeleton: {
    display: 'inline-block',
    marginLeft: 10,
  },
}));
