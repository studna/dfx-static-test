import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  rowWrapper: {
    margin: '0px 21px',
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  date: {
    display: 'inline-block',
    width: 180,
  },
  charge: {
    display: 'inline-block',
    width: 270,
    marginLeft: 80,
  },
}));
