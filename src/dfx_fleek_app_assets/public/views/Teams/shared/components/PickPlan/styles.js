import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  wrapper: {
    '&&& > div:nth-child(n+2)': {
      marginTop: 15,
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.palette.grey5}`,
    padding: '16px 25px',
    borderRadius: 4,
  },
  title: {
    fontWeight: 'normal',
  },
  subtitle: {
    color: theme.palette.palette.grey2,
  },
  defaultButton: {
    '&&&': {
      width: 170,
    },
  },
  disabledButton: {
    '&&&': {
      '& p': {
        fontWeight: 500,
        color: theme.palette.palette.grey3,
      },
      backgroundColor: 'unset',
      border: `1px solid ${theme.palette.palette.grey5}`,
    },
  },
  pickPlanButton: {
    '&&&': {
      '& p': {
        color: theme.palette.palette.whiteThree,
      },
      '&:hover': {
        transition: 'all 0.2s ease',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8,
      },
      border: 'unset',
      backgroundColor: theme.palette.primary.main,
    },
  },
  contactUs: {
    marginTop: 20,
    fontSize: 15,
  },
  emailLink: {
    color: theme.palette.palette.primaryBlue,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  resetAnchorStyles: {
    textDecoration: 'none',
  },
}));
