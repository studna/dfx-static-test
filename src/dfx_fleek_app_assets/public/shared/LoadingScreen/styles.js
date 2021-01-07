import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.palette.landingPageGrey,
  },
  logo: {
    height: 200,
  },
}));
