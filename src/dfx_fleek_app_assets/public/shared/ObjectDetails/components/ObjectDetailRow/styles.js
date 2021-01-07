import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '15px 0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    minWidth: 202,
  },
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
}));
