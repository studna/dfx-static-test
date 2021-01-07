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
    color: 'red',
    '& > div:focus': {
      outline: 'none',
    },
  },
  alert: {
    margin: '15px 0',
  },
  input: {
    margin: '24px 0 8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 150,
    // ^ to avoid changing height when there is an error below the input
  },
});
