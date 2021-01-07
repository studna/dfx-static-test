import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  row: {
    display: 'flex',
    padding: '16px 21px 16px 21px',
    alignItems: 'center',
    width: '100%',
  },
  rowText: {
    fontWeight: 500,
    margin: '0 auto 0 8px',
  },
  githubIcon: {
    display: 'flex',
    fontSize: 24,
  },
  arrowIcon: {
    display: 'flex',
    fontSize: 8,
  },
  filtersWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.palette.gray5}`,
    paddingBottom: 11,
    margin: '15px 0 11px',
  },
  listWrapper: {
    overflowY: 'auto',
    maxHeight: 280,
  },
  searchWrapper: {
    maxWidth: 244,
  },
}));
