import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    overflow: 'hidden',
    position: 'absolute',
    top: 55,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backdrop: {
    position: 'absolute',
    top: -55,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 9,
  },
  modal: {
    width: 472,
    padding: '23px 18px 18px 23px',
  },
  title: {
    fontSize: 22,
  },
  description: {
    fontSize: 15,
    margin: '23px 0',
    lineHeight: '1.32',
  },
  button: {
    float: 'right',
  },
}));
