import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: '0 -5px',
    '& > button': {
      margin: '0 5px',
    },
  },
  modal: {
    color: 'red',
    '& > div:focus': {
      outline: 'none',
    },
  },
  message: {
    margin: '10px 0 18px 0',
    '& > span': {
      color: '#000000',
    },
  },
  alert: {
    margin: '15px 0',
  },
});
