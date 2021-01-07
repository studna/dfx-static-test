import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'block',
    padding: 0,
    borderTop: `1px solid ${theme.palette.palette.grey5}`,
  },
  stepContent: {
    height: 73,
    display: 'flex',
    padding: '0 20px',
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledOpacity: {
    opacity: ({ isStepDisabled }) => (isStepDisabled ? 0.5 : 'initial'),
  },
  stepNumber: {
    height: 33,
    width: 33,
    paddingTop: 1,
    fontSize: 21.7,
    borderRadius: '100%',
    border: `solid 1px ${theme.palette.palette.black}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDetail: {
    flex: 1,
    marginLeft: 20,
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  stepStatus: {
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    '& > div > svg': {
      position: 'relative',
      top: 3,
      fontSize: 30,
      width: 30,
      height: 30,
      color: theme.palette.palette.green,
    },
  },
  stepAction: {
    padding: '8px 12px',
    fontSize: 15,
    minWidth: 230,
  },
  title: {
    display: 'flex',
  },
  subtitle: {
    marginTop: 2,
    marginBottom: 5,
    letterSpacing: 0,
  },
  cogIcon: {
    display: 'flex',
    '& svg': {
      marginLeft: 5,
      color: theme.palette.primary.main,
      fontSize: 14,
    },
  },
}));
