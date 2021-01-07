import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  modal: {
    '& > div': {
      padding: '23px 18px 18px',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  alert: {
    margin: '15px 0',
  },
  fullWidth: {
    margin: '18px -18px 0',
  },
});
