import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    padding: '15px 20px 15px 17px',
  },
  leftPart: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    minWidth: 0,
  },
  rightPart: {
    textAlign: 'right',
    flexShrink: 0,
  },
  icon: {
    display: 'flex',
    color: theme.palette.palette.grey2,
    fontSize: 8,
    marginLeft: 16,
  },
  bolder: {
    fontWeight: 500,
  },
  chip: {
    marginLeft: 10,
  },
  linkContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    textDecoration: 'none',
  },
  deployMessage: {
    flexBasis: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  linkBoundary: {
    position: 'relative',
  },
}));
