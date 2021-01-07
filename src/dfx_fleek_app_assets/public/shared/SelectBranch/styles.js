import { makeStyles } from '@material-ui/core/styles';

const INPUT_WIDTH = 330;

export default makeStyles((theme) => ({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    '& > div:first-child': {
      width: INPUT_WIDTH,
    },
  },
  dropdown: {
    '&&& svg': {
      height: 24,
      marginRight: 0,
    },
  },
  iconButton: {
    marginLeft: 10,
    padding: 0,
    height: 15,
    minWidth: 'unset',
  },
  icon: {
    display: 'flex',
    fontSize: 15,
    color: theme.palette.palette.grey2,
  },
  dropdownItem: {
    fontSize: 13,
  },
  dropdownItemRoot: {
    paddingTop: 3,
    paddingBottom: 3,
  },
}));
