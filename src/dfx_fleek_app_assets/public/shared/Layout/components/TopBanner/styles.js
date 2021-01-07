import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  text: {
    color: theme.palette.palette.black,
    fontSize: 14,
  },
  link: {
    color: theme.palette.palette.linkBlue,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
