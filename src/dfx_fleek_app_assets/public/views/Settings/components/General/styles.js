import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  nav: {
    width: 212,
    display: 'inherit',
    flexDirection: 'column',
  },
  sections: {
    flex: 1,
    padding: '7px 0 20px 20px',
  },
  nodeContainer: {
    width: '100%',
  },
  navigationLink: {
    display: 'flex',
    textDecoration: 'none',
    outline: 'none',
    userSelect: 'none',
    textAlign: 'left',
  },
});
