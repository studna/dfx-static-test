import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  buttonsContainer: {
    marginTop: 17,
    '&&& > button:nth-child(n + 2)': {
      marginLeft: 10,
    },
  },
  icon: {
    display: 'flex',
    marginLeft: 5,
    fontSize: 14,
  },
  description: {
    '&&&': {
      margin: '10px 0 auto',
    },
  },
  previewLink: {
    textDecoration: 'none',
  },
  linkButton: {
    display: 'flex',
    height: 'auto',
    padding: 0,
    '& > span': {
      margin: '10px 0 auto',
      '& > span': {
        fontSize: 15,
        color: theme.palette.palette.primaryBlue,
      },
    },
    '& svg': {
      color: theme.palette.palette.primaryBlue,
    },
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
}));
