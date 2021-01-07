import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    marginTop: 20,
    borderTop: `1px solid ${theme.palette.palette.whiteSmoke}`,
  },
  text: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
}));
