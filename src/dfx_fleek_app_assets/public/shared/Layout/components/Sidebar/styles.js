import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  teamContainer: {
    padding: '18px 15px',
    borderTop: `1px solid ${theme.palette.palette.whiteSmoke}`,
    borderBottom: `1px solid ${theme.palette.palette.whiteSmoke}`,
    marginBottom: 8,
  },
  teamLabel: {
    marginBottom: 7,
  },
  root: {
    height: '100%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  userMenuContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    padding: '15px 12px',
  },
  logo: {
    height: 33,
  },
  logoContainer: {
    display: 'flex',
    paddingBottom: 10,
    justifyContent: 'center',
  },
  cliContainer: {
    margin: '5px 15px',
  },
}));
