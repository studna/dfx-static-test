import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    '& svg': {
      display: 'flex',
      marginRight: 4,
      color: theme.palette.palette.grey2,
      fontSize: 18,
    },
  },
  link: {
    textDecoration: 'none',
  },
}));
