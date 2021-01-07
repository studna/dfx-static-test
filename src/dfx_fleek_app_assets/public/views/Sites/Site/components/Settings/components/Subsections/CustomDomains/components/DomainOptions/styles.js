import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  optionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 27,
  },
  domainOption: {
    padding: 0,
    fontSize: 12,
    cursor: 'pointer',
    color: theme.palette.error.main,
  },
  spinner: {
    marginLeft: 10,
    '& > div': {
      display: 'flex',
    },
    '& > div > div': {
      width: '12px !important',
      height: '12px !important',
      color: theme.palette.error.main,
    },
  },
  buttonBase: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: '3px 0',
  },
  remove: {
    display: 'flex',
    color: theme.palette.palette.errorRed,
  },
  linkText: {
    color: theme.palette.palette.linkBlue,
  },
  resetLinkStyles: {
    padding: '3px 0',
    textDecoration: 'none',
  },
  iconButtonRoot: {
    width: 5,
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
