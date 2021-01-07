import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      marginLeft: 10,
    },
  },
  modal: {
    '& > div:focus': {
      outline: 'none',
    },
  },
  message: {
    margin: '18px 0 28px 0',
  },
  alert: {
    margin: '15px 0',
  },
});
