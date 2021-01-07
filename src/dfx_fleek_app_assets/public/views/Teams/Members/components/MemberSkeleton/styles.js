import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({
  skeletonRoot: {
    borderRadius: 4,
  },
  member: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 25px',
  },
  memberInfo: {
    flex: 1,
    display: 'inherit',
    flexDirection: 'row',
    '& > div': {
      flex: 1,
      marginLeft: 22,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  },
  memberStatus: {
    flex: 1,
    display: 'inherit',
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));
