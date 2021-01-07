import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '8px 27px',
    marginTop: 18,
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.palette.whiteThree,
    '&:not(:last-child)': {
      marginRight: 28,
      flexShrink: 0,
    },
  },
}));
