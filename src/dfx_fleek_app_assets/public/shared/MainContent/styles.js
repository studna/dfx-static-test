import { makeStyles } from '@material-ui/core/styles';

const topbarHeight = 55;
const fleekAnnouncementBarHeight = 30;
const accountSuspensionBanner = (isBanner) => (isBanner ? 30 : 0);

export default makeStyles(() => ({
  root: {
    flex: 1,
    position: 'relative',
    height: '100vh',
  },
  topBar: {
    height: topbarHeight,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
  },
  topbarContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
  },
  contentWrapper: {
    overflow: 'auto',
    height: ({ isTopbar, isAccountSuspensionBanner }) => {
      const totalOffset = isTopbar
        ? topbarHeight + fleekAnnouncementBarHeight
          + accountSuspensionBanner(isAccountSuspensionBanner)
        : 0;
      return `calc(100vh - ${totalOffset}px)`;
    },
  },
  content: {
    padding: '3px 15px 15px',
  },
}));
