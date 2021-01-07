import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  dropzoneArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 485,
    height: 165,
    margin: '28px auto',
    backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23CECECEFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
    borderRadius: 6,
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
  dropzoneActive: {
    border: `2px solid ${theme.palette.palette.linkBlue}`,
    backgroundImage: 'none',
  },
  message: {
    marginTop: 13,
  },
  buttons: {
    display: 'flex',
    margin: '18px 18px 0',
  },
  cancelBtn: {
    margin: '0 10px 0 auto',
  },
  link: {
    color: theme.palette.palette.linkBlue,
  },
  icon: {
    display: 'flex',
    fontSize: 46,
  },
}));
