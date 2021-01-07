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
  inputContainer: {
    marginTop: 10,
    height: 260,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& > div:first-child': {
      maxHeight: 50,
      width: INPUT_WIDTH,
    },
    maxHeight: 50,
  },
  icon: {
    display: 'flex',
    fontSize: 15,
    color: theme.palette.palette.grey2,
  },
  buttonTooltip: {
    '&&&': {
      marginLeft: 10,
      minWidth: 'unset',
      height: 25,
      width: 25,
      borderRadius: 30,
      padding: 0,
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
  },
  tooltip: {
    '&&&': {
      fontWeight: 'normal',
      fontFamily: theme.typography.fontFamily,
      maxWidth: 216,
      border: `1px solid ${theme.palette.palette.grey5}`,
      color: theme.palette.palette.black,
      backgroundColor: theme.palette.palette.whiteThree,
      boxShadow: `0 0 6px 0 ${theme.palette.palette.extraLightBlack}`,
      padding: '10px 30px 11px 12px',
    },
  },
  helperTextWrapper: {
    display: 'flex',
    marginLeft: 15,
    color: theme.palette.palette.starYellow,
    backgroundColor: theme.palette.palette.fadeStarYellow,
    padding: '13px 15px',
  },
  helperText: {
    color: 'inherit',
    fontSize: 12,
  },
  helperIcon: {
    marginRight: 15,
    display: 'flex',
    fontSize: 16,
  },
  spinner: {
    position: 'absolute',
    right: 50,
  },
}));
