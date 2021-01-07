import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    padding: '5px 0 16px 0',
  },
  headerTitle: {
    fontWeight: 500,
  },
  spaceBetweenSections: {
    margin: 0,
    border: 'none',
    height: 15,
  },
  navigationLink: {
    textDecoration: 'none',
  },
}));
