import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  option: {
    height: 25,
    alignItems: 'stretch',
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
    '& > button': {
      flex: 1,
      padding: '0 10px',
      justifyContent: 'flex-start',
    },
  },
});
