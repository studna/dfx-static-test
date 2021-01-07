import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  sectionContent: {
    padding: 0,
  },
  link: {
    marginBottom: 21,
  },
  description: {
    padding: '21px 20px 10px',
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
  alertContent: {
    padding: '15px 20px 0 20px',
  },
  dataWrapper: {
    padding: '13px 20px',
  },
  envVarRow: {
    display: 'flex',
  },
  sectionFooter: {
    padding: ({ envVars }) => (envVars.length === 0 || envVars.length % 2
      ? '7px 20px 20px'
      : 20
    ),
  },
}));
