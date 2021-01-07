import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  value: {
    fontWeight: 500,
  },
  input: {
    width: 330,
  },
  info: {
    marginTop: 5,
    fontSize: 12,
    letterSpacing: 0,
  },
  label: {
    flexBasis: 190,
    flexShrink: 0,
    lineHeight: ({ isEditingMode }) => (isEditingMode ? 2.2 : null),
  },
  bigInput: {
    '& input': {
      padding: '8px 0px',
    },
  },
}));
