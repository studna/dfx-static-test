import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  wrapper: {
    '&&& strong': {
      fontWeight: 600,
    },
  },
  content: {
    '&&&:nth-child(2)': {
      paddingTop: 20,
      paddingBottom: 20,
      '& > div:nth-child(n + 2)': {
        marginTop: 10,
      },
    },
  },
  icon: {
    '&&&': {
      display: 'flex',
      fontSize: 15,
      color: theme.palette.palette.grey2,
    },
  },
  title: {
    display: 'flex',
  },
  textSubtitle: {
    marginLeft: 30,
    color: theme.palette.palette.grey2,
  },
  textTitle: {
    marginLeft: 15,
    fontWeight: 500,
  },
}));
