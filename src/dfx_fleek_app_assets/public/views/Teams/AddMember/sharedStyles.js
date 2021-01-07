import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    fontWeight: 500,
    fontSize: 22,
  },
  subtitle: {
    color: theme.palette.palette.grey2,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 500,
  },
  emailContainer: {
    marginTop: 28,
  },
  emailInput: {
    marginTop: 13,
    width: 330,
  },
  submitButton: {
    marginTop: 15,
    width: 170,
  },
  extraSeatsContainer: {
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 500,
  },
  alert: {
    margin: '-5px 0px 8px 0px',
  },
  boxWrapper: {
    alignItems: 'flex-start',
  },
}));
