import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: ({ error }) => (error ? 16 : 0),
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
    margin: '23px 0',
  },
  form: {
    '& > div:first-child > p': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  urlContainer: {
    top: -16,
    position: 'relative',
  },
});
