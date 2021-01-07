import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '23px 20px',
  },
  row: {
    display: 'flex',
  },
  label: {
    flexBasis: 230,
  },
  button: {
    marginTop: 20,
  },
  creditCardIcon: {
    display: 'flex',
    color: theme.palette.text.secondary,
    marginRight: 8,
    fontSize: 21,
  },
}));
