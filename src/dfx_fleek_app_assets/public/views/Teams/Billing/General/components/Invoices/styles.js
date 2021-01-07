import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  sectionContent: {
    padding: 0,
    maxHeight: 260,
    overflowY: 'auto',
  },
  header: {
    padding: '5px 0 16px 0',
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 17,
  },
  receiptContainer: {
    padding: '13px 21px',
  },
  date: {
    display: 'inline-block',
    width: 240,
    fontSize: 15,
  },
  charge: {
    display: 'inline-block',
    fontSize: 15,
    fontWeight: 550,
  },
}));
