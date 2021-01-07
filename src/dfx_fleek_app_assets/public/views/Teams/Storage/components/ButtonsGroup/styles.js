import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    display: 'inherit',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  group: {
    margin: '0 -5px',
    '& > *': {
      margin: '0 5px',
    },
  },
  buttonContent: {
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    '& > div': {
      fontSize: 15,
      marginRight: 7,
      display: 'inline-flex',
    },
  },
});
