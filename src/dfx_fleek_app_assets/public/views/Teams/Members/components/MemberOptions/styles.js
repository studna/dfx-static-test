import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  optionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 27,
  },
  memberOption: {
    padding: 0,
    fontSize: 12,
    cursor: 'pointer',
    color: theme.palette.error.main,
  },
  spinner: {
    paddingLeft: 5,
    '& > div': {
      display: 'flex',
    },
    '& > div > div': {
      width: '12px !important',
      height: '12px !important',
      color: theme.palette.error.main,
    },
  },
  iconButtonRoot: {
    width: 5,
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
