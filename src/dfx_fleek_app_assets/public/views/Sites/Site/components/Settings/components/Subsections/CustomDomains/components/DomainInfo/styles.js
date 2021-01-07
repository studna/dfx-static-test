import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  domainInfo: {
    flex: 1,
    display: 'inherit',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  domainText: {
    '&:before': {
      content: "''",
      display: 'inline-block',
      width: 6,
      height: 6,
      marginRight: 7,
      marginLeft: 1,
      borderRadius: '100%',
    },
  },
  activeText: {
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
  typeText: {
    fontSize: 13,
    marginLeft: 15,
    color: theme.palette.palette.grey2,
  },
}));
