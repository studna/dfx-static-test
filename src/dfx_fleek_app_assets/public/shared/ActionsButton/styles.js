import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  buttonContent: {
    height: 18,
    display: 'flex',
    flexDirection: 'row',
    '& > div': {
      fontSize: 11,
      marginLeft: 5,
      display: 'inline-flex',
    },
  },
  button: {
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'unset !important',
    },
  },
  list: {
    padding: '5px 0',
  },
}));
