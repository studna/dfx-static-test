import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  sectionContent: {
    padding: 0,
    maxWidth: 715,
    '& li': {
      padding: '0px 20px',
    },
  },
  textContainer: {
    display: 'flex',
    padding: 10,
    '& > p:first-child': {
      width: '30%',
    },
    '& > p:last-child': {
      width: '70%',
    },
  },
  secondColumn: {
    fontWeight: 500,
  },
  buttonContainer: {
    padding: '10px 30px 22px 30px',
  },
}));
