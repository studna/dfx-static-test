import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  titleWrapper: {
    marginBottom: 13,
  },
  paragraph: {
    color: theme.palette.palette.grey2,
    fontSize: 15,
  },
  sectionWrapper: {
    marginBottom: 30,
  },
  comingSoon: {
    color: theme.palette.palette.yellowPending,
    marginLeft: 9,
  },
  pollingMessage: {
    marginBottom: 10,
  },
}));
