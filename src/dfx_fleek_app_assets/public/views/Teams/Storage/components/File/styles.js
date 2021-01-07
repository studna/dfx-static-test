import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  divider: {
    height: 1,
    margin: '20px -27px',
    backgroundColor: theme.palette.palette.whiteSmoke,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));
