import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 18,
    '& > *': {
      marginLeft: 10,
    },
  },
  fullWidth: {
    margin: '18px -23px 0',
  },
});
