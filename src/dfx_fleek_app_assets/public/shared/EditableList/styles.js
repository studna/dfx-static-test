import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  sectionContent: {
    padding: 0,
  },
  dataRow: {
    display: 'flex',
    padding: '13px 20px',
  },
  sectionFooter: {
    padding: ({ data }) => (data.length % 2 ? '7px 20px 20px' : 20),
  },
  description: {
    padding: '21px 20px 23px',
  },
  singleDataRow: {
    display: 'flex',
    padding: '0 20px',
  },
  alertContent: {
    padding: '15px 20px 0 20px',
  },
  defaultValue: {
    color: '#666666',
  },
}));
