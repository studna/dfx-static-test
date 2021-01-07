import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  externalLink: {
    position: 'relative', // to keep these link above the card link
    color: theme.palette.palette.primaryBlue,
    textDecoration: 'none',
  },
}));
