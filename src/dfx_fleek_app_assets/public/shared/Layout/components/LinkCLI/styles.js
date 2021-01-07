import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 3,
    padding: '5px 7px',
    textDecoration: 'none',
    backgroundColor: '#d0e4ff',
    justifyContent: 'space-between',
    color: theme.palette.palette.linkBlue,
  },
}));
