import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  copyToClipboardButtonContainer: {
    marginLeft: 10,
  },
  buttons: {
    height: 28,
    '& span': {
      height: 10,
    },
  },
  buttonsContainer: {
    display: 'flex',
  },
  previewLink: {
    textDecoration: 'none',
  },
  contextTextContainer: {
    padding: '16px 21px 9px 21px',
    backgroundColor: '#071e26',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  contentText: {
    whiteSpace: 'pre-line',
    overflowWrap: 'break-word',
    minHeight: 200,
    color: 'white',
    fontSize: 15,
    lineHeight: 1.25,
  },
  noPadding: {
    padding: 0,
  },
}));
