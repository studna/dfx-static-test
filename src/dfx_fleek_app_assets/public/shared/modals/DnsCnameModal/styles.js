import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal: {
    '& > div': {
      outline: 'none',
    },
  },
  errorBox: {
    width: 700,
    padding: '9px 12px',
    boxSizing: 'border-box',
    height: 52,
    backgroundColor: theme.palette.palette.errorRed,
    borderRadius: 4,
    position: 'absolute',
    top: '-70px',
    left: 0,
    color: 'white',
    fontSize: 12,
  },
  pointText: {
    margin: '19px 0 13px 0',
    color: '#000',
    fontWeight: 500,
  },
  description: {
    marginBottom: 20,
    color: theme.palette.palette.grey2,
    lineHeight: 1.29,
  },
  blackBox: {
    padding: '16px 17px 16px 17px',
    backgroundColor: '#081f24',
    borderRadius: 6,
    marginBottom: 20,
  },
  consoleText: {
    fontFamily: 'Inconsolata, monospace',
    color: 'white',
  },
  footerText: {
    color: theme.palette.palette.grey2,
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: 15,
    },
  },
}));
