import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    '&:not(:last-child)': {
      paddingBottom: 8,
    },
  },
  description: {
    fontSize: 12,
  },
  radioBtn: {
    padding: 0,
    margin: '2px 8px 0 0',
    color: theme.palette.palette.grey2,
    '&$radioBtnChecked': {
      color: theme.palette.palette.linkBlue,
    },
    '& svg': {
      fontSize: 18,
    },
  },
  radioBtnChecked: {},
}));
