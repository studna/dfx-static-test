import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  contentWrapper: {
    margin: '5px 0 15px 0',
    padding: '10px 20px',
  },
  paragraph: {
    color: theme.palette.palette.grey2,
    fontSize: 15,
    lineHeight: '19px',
  },
  alertBoxWrapper: {
    marginBottom: 15,
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
  paragraphWrapper: {
    marginBottom: 13,
  },
  linkWrapper: {
    marginBottom: 17,
  },
  waitingWrapper: {
    marginBottom: 8,
  },
  waiting: {
    display: 'inline-block',
    fontSize: 15,
    color: theme.palette.palette.black,
    fontWeight: 500,
  },
  gearIcon: {
    display: 'inline-block',
    color: theme.palette.palette.starYellow,
    fontSize: 13,
    position: 'relative',
    top: 2,
    marginLeft: 5,
    '& svg': {
      animation: '$spin 4s infinite linear',
    },
  },
  '@keyframes spin': {
    from: {
      transform: 'rotWate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  enabledTextWrapper: {
    display: 'inline-block',
  },
  darkText: {
    fontSize: 15,
    color: theme.palette.palette.black,
    fontWeight: 500,
    display: 'inline-block',
  },
  checkIcon: {
    marginLeft: 5,
    display: 'inline-block',
    fontSize: 11,
    color: theme.palette.palette.green,
  },
  tag: {
    width: 190,
    fontSize: 15,
    color: theme.palette.palette.black,
    display: 'inline-block',
  },
  infoLine: {
    padding: '11px 20px',
  },
  newDomain: {
    marginTop: 5,
  },
  enabledWrapper: {
    padding: '18px 20px 10px 20px',
  },
  cardTitledContent: {
    padding: 0,
  },
}));
