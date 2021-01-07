import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.palette.landingPageGrey,
  },
  typography: {
    marginTop: 30,
    fontSize: 36.9,
    borderRadius: 10,
    padding: '17px 60px',
    background: theme.palette.palette.whiteThree,
  },
  logo: {
    height: 198,
  },
}));
