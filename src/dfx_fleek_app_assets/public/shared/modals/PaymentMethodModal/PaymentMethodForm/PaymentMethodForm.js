import get from 'lodash/get';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AlertTitle from '@material-ui/lab/AlertTitle';
import LabelInput from '@terminal-packages/ui/core/LabelInput';
import LabelSelect from '@terminal-packages/ui/core/LabelSelect';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import useStyles from './styles';
import countries from './country.json';
import { CardInput } from './components';

const validateFields = (name, country, card, i18n) => {
  const errors = [];

  const isValidName = name !== '';
  const isValidCountry = country !== 'none';
  const isValidCard = get(card, 'complete', false);

  if (!isValidName) errors.push(get(i18n, 'error.name', ''));
  if (!isValidCard) errors.push(get(i18n, 'error.card', ''));
  if (!isValidCountry) errors.push(get(i18n, 'error.country', ''));

  return errors;
};

const PaymentMethodForm = (props) => {
  const {
    i18n,
    onSuccess,
    className,
    clientSecret,
  } = props;

  const [card, setCard] = useState();
  const [name, setName] = useState('');
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('none');

  const stripe = useStripe();
  const elements = useElements();

  const classes = useStyles();

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFields(name, country, card, i18n);

    if (errors.length > 0) {
      setError(errors);
      return;
    }

    if (!stripe || !elements) {
      const internalErrors = [get(i18n, 'error.internal', '')];
      setError(internalErrors);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setLoading(true);

    try {
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            address: {
              country,
            },
          },
        },
      });

      if (get(result, 'error', false)) {
        const errorMessage = get(result, 'error.message', '');

        setError([errorMessage]);
      }

      onSuccess(result, setLoading);
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.error(err);
      setError([get(i18n, 'error.internal', '')]);
      setLoading(false);
    }
  };

  const setValue = (value, setFn) => {
    if (error.length > 0) setError([]);
    setFn(value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classnames(
        classes.form,
        className,
      )}
    >
      {error.length > 0 && (
        <Alert severity="error" className={classes.alert}>
          <AlertTitle>{get(i18n, 'error.title', '')}</AlertTitle>
          <ul className={classes.errorList}>
            {error.map((err, i) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <li key={i}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
      <LabelInput
        labelProps={{
          className: classes.input,
        }}
        value={name}
        label={get(i18n, 'inputs.name.label', '')}
        placeholder={get(i18n, 'inputs.name.placeholder', '')}
        onChange={(e) => setValue(e.target.value, setName)}
      />
      <LabelSelect
        labelProps={{
          className: classes.input,
        }}
        value={country}
        options={countries}
        label={get(i18n, 'inputs.country.label', '')}
        onChange={(e) => setValue(e.target.value, setCountry)}
        placeholder={get(i18n, 'inputs.country.placeholder', '')}
      />
      <CardInput
        className={classes.input}
        onChange={(cardObject) => setValue(cardObject, setCard)}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        className={classes.button}
        disabled={loading}
      >
        {get(i18n, 'inputs.cta', '')}
      </Button>
    </form>
  );
};

PaymentMethodForm.defaultProps = {
  i18n: {},
  className: null,
  clientSecret: '',
  onSuccess: () => {},
};

PaymentMethodForm.propTypes = {
  onSuccess: PropTypes.func,
  className: PropTypes.string,
  clientSecret: PropTypes.string,
  i18n: PropTypes.shape({
    inputs: PropTypes.shape({
      name: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
      }),
      country: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
      }),
      cta: PropTypes.string,
    }),
    error: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      country: PropTypes.string,
      card: PropTypes.string,
      internal: PropTypes.string,
    }),
  }),
};

export default PaymentMethodForm;
