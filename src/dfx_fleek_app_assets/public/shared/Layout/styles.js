import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    maxWidth: 300,
  },
  content: {
    position: 'relative',
    marginTop: 48,
    marginLeft: 160,
  },
  sidebar: {
    width: 200,
    paddingTop: 10,
    position: 'relative',
    boxShadow: theme.palette.shadows.small,
    backgroundColor: theme.palette.palette.whiteThree,
  },
  container: {
    display: 'flex',
    position: 'fixed',
    top: 30,
    left: 0,
    right: 0,
    height: 'calc(100vh - 30px)',
  },
  bannerContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
}));
