import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  tableRow: {
    '& > *': {
      borderBottom: 'none',
      borderTop: `1px solid ${theme.palette.palette.extraLightGray}`,
    },
    '& > *:nth-child(1)': {
      paddingLeft: 28,
      paddingRight: 10,
      minWidth: 310,
      maxWidth: 310,
    },
    '& > *:nth-child(2)': {
      minWidth: 272,
      maxWidth: 272,
    },
    '& > *:nth-child(3)': {
      minWidth: 37,
      maxWidth: 37,
    },
  },
  textEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  label: {
    marginLeft: 10,
  },
}));
