import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  domainStatus: {
    flex: 1,
    display: 'inherit',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > *': {
      marginRight: 10,
    },
  },
  DNSBox: {
    backgroundColor: theme.palette.palette.fadeOutBlue,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 10px',
    textDecoration: 'none',
  },
  DNSText: {
    color: theme.palette.palette.primaryBlue,
    fontSize: 13,
  },
  waiting: {
    color: theme.palette.palette.grey2,
    fontSize: 15,
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
}));
