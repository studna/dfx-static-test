import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  checkboxCell: {
    width: 68,
    paddingLeft: 28,
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
    '& *': {
      userSelect: 'none',
    },
  },
  fileName: {
    maxWidth: 500,
  },
});
