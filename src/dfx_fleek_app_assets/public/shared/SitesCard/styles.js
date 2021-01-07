import { makeStyles } from '@material-ui/core/styles';
import { DEPLOY_STATUS } from '~/constants';

const getDomainColor = (status, theme) => {
  switch (status) {
    case DEPLOY_STATUS.IN_PROGRESS:
      return theme.palette.palette.yellowPending;
    case DEPLOY_STATUS.FAILED:
    case DEPLOY_STATUS.CANCELLED:
      return theme.palette.palette.errorRed;
    default:
      return theme.palette.palette.primaryBlue;
  }
};

export default makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  siteContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  siteInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  preview: ({ preview }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 234,
    height: 132,
    backgroundColor: preview ? theme.palette.palette.grey4 : 'none',
    borderRadius: 6,
    backgroundImage: `url(${preview})`,
    backgroundSize: 'cover',
    border: preview ? 'none' : `1px solid ${theme.palette.palette.grey4}`,
    '& > * ': {
      display: preview ? 'none' : 'flex',
      fontSize: 70,
      color: theme.palette.palette.grey4,
    },
  }),
  published: {
    marginLeft: 7,
    alignSelf: 'center',
    color: theme.palette.palette.grey2,
  },
  repoIcon: {
    width: 20,
    '& > svg': {
      height: 15,
      float: 'left',
      marginTop: 3,
      paddingRight: 9,
    },
  },
  repoContainer: {
    marginBottom: 2,
    marginTop: 5,
  },
  repo: {
    textDecoration: 'underline',
    color: 'black',
  },
  ipfsContainer: {
    display: 'inline-flex',
  },
  ipfs: {
    textDecoration: 'underline',
    color: 'black',
  },
  ipfsPending: {
    color: theme.palette.palette.grey2,
  },
  ipfsIcon: {
    width: 15,
    height: 15,
    margin: '3px 9px 0 0',
    float: 'left',
  },
  linkStyleReset: {
    textDecoration: 'none',
  },
  coloredHover: {
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.palette.primaryBlue,
    },
  },
  domain: ({ status }) => ({
    '&:before': {
      content: "''",
      display: 'inline-block',
      width: 6,
      height: 6,
      backgroundColor: getDomainColor(status, theme),
      margin: 1,
      marginRight: 7,
      marginLeft: 1,
      borderRadius: '100%',
    },
    color: getDomainColor(status, theme),
  }),
  skeletonRoot: {
    backgroundColor: theme.palette.palette.grey5,
    borderRadius: 4,
  },
}));
