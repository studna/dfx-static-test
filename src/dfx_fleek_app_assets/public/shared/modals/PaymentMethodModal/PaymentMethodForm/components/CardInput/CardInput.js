import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTheme } from '@material-ui/core/styles';
import { CardElement } from '@stripe/react-stripe-js';

import useStyles from './styles';

const getCardOptions = (theme) => ({
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      fontWeight: 400,
      fontSize: '13px',
      fontSmoothing: 'antialiased',
      lineHeight: '1.23',
      fontStyle: 'normal',
      textTransform: 'none',
      letterSpacing: '0.4px',
      color: theme.palette.palette.black,
      iconColor: theme.palette.palette.grey2,
      fontFamily: '"Work Sans", "Roboto", Helvetica, Arial, sans-serif',
      '::placeholder': {
        color: theme.palette.palette.grey6,
      },
    },
    invalid: {
      color: theme.palette.palette.errorRed,
      iconColor: theme.palette.palette.errorRed,
    },
  },
});

const CardComponent = ({ onChange, className }) => {
  const theme = useTheme();
  const classes = useStyles();

  const cardOptions = getCardOptions(theme);

  return (
    <div
      className={classnames(
        classes.root,
        className,
      )}
    >
      <CardElement options={cardOptions} onChange={onChange} />
    </div>
  );
};

CardComponent.defaultProps = {
  className: null,
};

CardComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CardComponent;
