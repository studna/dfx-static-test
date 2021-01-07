import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    height: 30,
    backgroundColor: theme.palette.palette.errorRed,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  text: {
    fontSize: 13,
    color: 'white',
  },
  link: {
    fontWeight: 600,
    textDecoration: 'none',
    color: 'white',
  },
  icon: {
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
    marginRight: 3,
  },
}));
