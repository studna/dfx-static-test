import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  modal: {
    '& > div': {
      outline: 'none',
    },
  },
  messageBox: {
    width: 700,
    padding: '9px 12px',
    boxSizing: 'border-box',
    borderRadius: 4,
    position: 'absolute',
    top: '-45px',
    left: 0,
    fontSize: 12,
  },
  errorBox: {
    backgroundColor: theme.palette.palette.lightErrorRed,
    color: theme.palette.palette.saturatedRed,
  },
  warningBox: {
    backgroundColor: theme.palette.palette.fadeStarYellow,
    color: theme.palette.palette.starYellow,
  },
  subtitle: {
    margin: '19px 0 13px 0',
    color: '#000',
    fontWeight: 500,
  },
  description: {
    marginBottom: 20,
    color: theme.palette.palette.grey2,
    lineHeight: 1.29,
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
  verifiedContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.palette.fadeOutGreen,
    borderRadius: 3,
    marginLeft: 13,
    height: 24,
    padding: 5,
  },
  checkmark: {
    color: theme.palette.palette.green,
    fontSize: 12,
    marginRight: 4,
    marginLeft: -1,
    display: 'inline-block',
    position: 'relative',
    top: 2,
  },
  verifiedText: {
    color: theme.palette.palette.green,
    fontSize: 12,
    display: 'inline-block',
  },
  migrateStepTitleText: {
    display: 'inline-block',
  },
  link: {
    textDecoration: 'none',
  },
}));
