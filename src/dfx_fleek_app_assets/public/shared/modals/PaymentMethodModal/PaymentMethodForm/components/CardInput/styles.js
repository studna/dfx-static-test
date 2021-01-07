import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flex: 1,
    borderRadius: 4,
    padding: '10px 15px',
    alignItems: 'center',
    backgroundColor: 'white',
    border: `solid 1px ${theme.palette.palette.grey4}`,
  },
}));
