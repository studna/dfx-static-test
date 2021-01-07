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
});
