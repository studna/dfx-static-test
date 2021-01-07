import { makeStyles } from '@material-ui/core/styles';

const INPUT_WIDTH = 330;

export default makeStyles((theme) => ({
  textInput: {
    '&&&': {
      width: INPUT_WIDTH,
      height: 50,
    },
    '&&& > div': {
      height: 50,
    },
  },
  docs: {
    marginRight: 5,
    textDecoration: 'none',
  },
  inputContainer: {
    marginTop: 7,
    height: 115,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subtitle: {
    color: theme.palette.palette.grey2,
  },
  secondaryTitleComponent: {
    marginTop: 40,
    marginBottom: 10,
    height: 80,
    '& button': {
      height: 30,
      '& span': {
        height: 30,
      },
    },
  },
  buttonContainer: {
    marginTop: 30,
  },
  arrowIcon: {
    display: 'flex',
    fontSize: 15,
    marginLeft: 5,
  },
  advancedWrapper: {
    maxWidth: 700,
  },
  title: {
    fontWeight: 500,
  },
}));
