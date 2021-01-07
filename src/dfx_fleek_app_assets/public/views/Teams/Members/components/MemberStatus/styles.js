import { makeStyles } from '@material-ui/core/styles';

import { MEMBER_STATUSES } from '../../constants';

export default makeStyles((theme) => ({
  memberStatus: {
    flex: 1,
    '& > p': {
      margin: 0,
    },
    '& > p:nth-child(1)': {
      fontSize: 15,
      fontWeight: 500,
      color: ({ status }) => (
        status === MEMBER_STATUSES.pending ? theme.palette.palette.grey2 : '#000000'
      ),
    },
    '& > p:nth-child(2)': {
      fontSize: 13,
      color: theme.palette.palette.grey2,
      display: ({ status }) => (status === MEMBER_STATUSES.pending ? 'none' : 'flex'),
    },
  },
}));
