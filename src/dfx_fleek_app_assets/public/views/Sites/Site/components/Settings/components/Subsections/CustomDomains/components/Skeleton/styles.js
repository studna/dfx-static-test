import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
  domainWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    margin: '5px 20px 5px 20px',
    padding: '10px 0px 10px 0px',
  },
  domainStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 100,
  },
  domainName: {
    marginBottom: 5,
  },
}));
