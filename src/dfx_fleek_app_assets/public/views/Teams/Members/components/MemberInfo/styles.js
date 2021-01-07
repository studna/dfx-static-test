import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  memberInfo: {
    flex: 1,
    display: 'inherit',
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberData: {
    width: 'auto',
    marginLeft: 22,
    '& > p': {
      margin: 0,
    },
    '& > .user-name': {
      fontSize: 15,
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
    '& > .user-email': {
      fontSize: 13,
      color: theme.palette.palette.grey2,
      display: ({ name }) => (!name ? 'none' : 'inherit'),
    },
  },
  memberAvatar: {
    display: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.palette.grey4}`,
    '&, & > img': {
      width: 48,
      height: 48,
      borderRadius: 4,
      objectFit: 'cover',
    },
    backgroundColor: theme.palette.palette.whiteThree,
    '& > div, & > div > svg': {
      height: 21,
      width: '18px !important',
    },
    '& > div': {
      fontSize: 20,
      color: theme.palette.palette.grey4,
    },
  },
}));
