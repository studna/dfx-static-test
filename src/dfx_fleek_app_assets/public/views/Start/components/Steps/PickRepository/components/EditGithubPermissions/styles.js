import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: 25,
  },
  linkButton: {
    padding: 0,
    '& p': {
      color: theme.palette.palette.linkBlue,
    },
  },
}));
