import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    '& > div:hover': {
      cursor: 'default',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  textContainer: {
    marginBottom: 15,
  },
  title: {
    fontWeight: 500,
  },
  subtitle: {
    color: theme.palette.palette.grey2,
    lineHeight: 1.2,
  },
}));
