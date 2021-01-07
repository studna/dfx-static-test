import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    height: 135,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    fontWeight: 500,
    marginRight: 15,
    minWidth: 0,
  },
  ipfsIcon: {
    width: 15,
    height: 15,
    margin: '3px 9px 0 0',
  },
  ipfsPending: {
    color: theme.palette.palette.grey2,
  },
  ipfs: {
    textDecoration: 'underline',
    color: 'black',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flexDireciton: 'row',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'calc(100% - 250px)',
  },
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  objectUrl: {
    margin: '13px 0',
    '& a': {
      textDecoration: 'none',
    },
    '& p': {
      display: 'list-item',
    },
  },
  lastModifiedDate: {
    flexShrink: 0,
  },
}));
