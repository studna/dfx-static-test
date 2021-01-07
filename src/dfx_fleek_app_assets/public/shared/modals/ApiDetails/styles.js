import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > div:focus': {
      outline: 'none',
    },
  },
  content: {
    padding: '20px 0',
  },
  warning: {
    height: 24,
    width: '100%',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.palette.fadeStarYellow,
    '& *': {
      color: theme.palette.palette.starYellow,
    },
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: '0 -5px',
    '& > button': {
      margin: '0 5px',
    },
  },
  iconContainer: {
    marginRight: 15,
    '& > div': {
      display: 'flex',
      cursor: 'pointer',
    },
    '& > div > svg': {
      width: '14px !important',
      color: theme.palette.palette.linkBlue,
    },
  },
}));
