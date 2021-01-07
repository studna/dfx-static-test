import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  rowContainer: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: 23,
    paddingLeft: 27,
    paddingRight: 27,
  },
  imageContainer: {
    paddingRight: 28,
    display: 'inline-block',
  },
  siteInfoContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: 290,
  },
  siteOwnerInfoContainer: {
    display: 'inline-block',
    width: 390,
  },
  endArrowContainer: {
    display: 'inline-flex',
    fontSize: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));
