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
    cursor: 'default',
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
    display: 'flex',
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    textAlign: 'left',
  },
  mainLink: {
    cursor: 'default',
  },
  subsectionLink: {
    cursor: 'pointer',
  },
  billingDetailsContainer: {
    marginTop: 30,
  },
  nodeContainer: {
    width: '100%',
  },
}));
