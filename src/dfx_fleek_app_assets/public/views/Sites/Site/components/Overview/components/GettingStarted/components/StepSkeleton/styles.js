import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    padding: 0,
    borderTop: `1px solid ${theme.palette.palette.grey5}`,
  },
  stepContent: {
    display: 'flex',
    padding: '15px 20px',
    alignItems: 'center',
  },
  stepNumber: {
    height: 33,
    width: 33,
    paddingTop: 1,
    fontSize: 21.7,
    borderRadius: '100%',
    border: `solid 1px ${theme.palette.palette.black}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDetail: {
    flexGrow: 1,
    marginLeft: 20,
  },
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  titleSkeleton: {
    marginBottom: 5,
  },
}));
