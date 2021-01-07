import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    minHeight: 68,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 27,
    paddingRight: 27,
  },
  rowContainer: {
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    paddingRight: 28,
    height: 48,
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
  endArrowBasic: {
    outline: 0,
    display: 'inline-block',
    width: 10,
  },
  endArrowClickable: {
    cursor: 'pointer',
  },
  image: {
    width: 66,
    height: 48,
    borderRadius: 3,
  },
  placeholderIconContainer: {
    display: 'inline-block',
    height: 20,
    fontSize: 20,
  },
  imagePlaceholder: {
    width: 66,
    height: 48,
    borderRadius: 3,
    border: `1px solid ${theme.palette.grey['300']}`,
    color: theme.palette.grey['300'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 15,
    fontWeight: 500,
  },
  subText: {
    fontSize: 13,
    color: '#666666',
  },
  greyColor: {
    color: '#666666',
  },
  cardLink: {
    flex: 1,
    color: 'inherit',
    textDecoration: 'none',
  },
  deployLink: {
    color: theme.palette.common.black,
    textDecoration: 'underline',
  },
}));
