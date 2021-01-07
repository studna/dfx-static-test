import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  terminal: {
    padding: 16,
    borderRadius: 6,
    margin: '20px 0 22px',
    backgroundColor: '#081f24',
    color: theme.palette.palette.whiteThree,
  },
  ctaContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *:not(:last-child)': {
      marginRight: 10,
    },
  },
  subtitle: {
    marginTop: 20,
  },
  subtitle2: {
    color: theme.palette.palette.grey2,
    marginTop: 13,
  },
  errorBox: {
    width: 700,
    padding: '9px 12px',
    boxSizing: 'border-box',
    height: 68,
    backgroundColor: theme.palette.palette.errorRed,
    borderRadius: 4,
    position: 'absolute',
    top: '-86px',
    left: 0,
    color: 'white',
    fontSize: 12,
  },
  submitButton: {
    minWidth: 222,
  },
  footerText: {
    color: theme.palette.palette.grey2,
    marginBottom: 10,
  },
}));
