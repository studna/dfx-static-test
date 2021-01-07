import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    height: 34,
    width: 145,
    '& span': {
      color: theme.palette.palette.white,
    },
  },
  icon: {
    display: 'flex',
    margin: '0px 4px 0px 19px',
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  resetLinkStyles: {
    textDecoration: 'none',
  },
}));
