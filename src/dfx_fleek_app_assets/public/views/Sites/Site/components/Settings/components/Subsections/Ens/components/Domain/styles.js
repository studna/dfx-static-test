import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    minHeight: 60,
    display: 'flex',
    paddingTop: 10,
  },
  domainStatus: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
  },
  notVerifiedStatus: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  verifiedStatus: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  pendingChip: {
    marginRight: 10,
  },
  domainInfo: {
    display: 'inherit',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 325,
  },
  domainLink: {
    '&:before': {
      content: "''",
      display: 'inline-block',
      width: 6,
      height: 6,
      marginRight: 7,
      marginLeft: 1,
      borderRadius: '100%',
    },
    textDecoration: 'none',
  },
  activeText: {
    cursor: 'pointer',
    color: theme.palette.palette.primaryBlue,
    textDecoration: 'none',
    '&:before': {
      backgroundColor: theme.palette.palette.primaryBlue,
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  inactiveText: {
    '&:before': {
      backgroundColor: theme.palette.palette.grey2,
    },
    color: theme.palette.palette.grey2,
  },
  description: {
    fontSize: 13,
    marginLeft: 15,
    color: theme.palette.palette.grey2,
  },
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
  },
  remove: {
    display: 'flex',
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
    justifyContent: 'space-between',
    padding: '3px 0',
  },
  check: {
    color: theme.palette.palette.black,
    fontSize: 15,
  },
  warningWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  warningIcon: {
    marginRight: 6,
    fontSize: 16,
    color: theme.palette.palette.yellowPending,
    position: 'relative',
    top: 2,
  },
  iconButtonRoot: {
    width: 5,
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
