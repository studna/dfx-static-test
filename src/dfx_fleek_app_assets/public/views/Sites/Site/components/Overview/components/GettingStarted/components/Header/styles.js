import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
  },
  closeButton: {
    padding: 0,
    height: 18,
    minWidth: 'auto',
    fontSize: 18,
  },
}));
