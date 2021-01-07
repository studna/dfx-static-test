import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  content: {
    padding: '3px 0 16px 0',
  },
  item: {
    height: 46,
    padding: '0 20px',
    alignItems: 'center',
    '& > p:nth-child(2)': {
      width: 260,
    },
  },
  key: {
    minWidth: 202,
  },
  buttonContainer: {
    padding: '0 20px',
  },
  iconContainer: {
    flex: 1,
    '& > div': {
      fontSize: 16,
      display: 'flex',
      cursor: 'pointer',
    },
    '& > div > svg': {
      width: '14px !important',
      color: theme.palette.palette.linkBlue,
    },
  },
}));
