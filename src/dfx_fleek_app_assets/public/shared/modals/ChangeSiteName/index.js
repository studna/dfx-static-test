import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';

import BaseModal from '@terminal-packages/ui/core/BaseModal';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { url } from '@Shared';
import { newApiClient } from '@Clients';
import { EDIT_SITE_NAME } from '@Shared/graphql/mutations';

import util from './util';
import useStyles from './styles';

const ChangeSiteNameModal = ({
  open,
  onClose,
  siteBySlug,
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    error: null,
    loading: false,
    inputValue: '',
  });

  const [editSiteName] = useMutation(EDIT_SITE_NAME, {
    client: newApiClient,
  });

  const classes = useStyles(state);

  const slug = get(siteBySlug, 'data.getSiteBySlug.slug', '');
  const siteId = get(siteBySlug, 'data.getSiteBySlug.id', '');

  const disableConfirmButton = state.loading
    || !state.inputValue.length
    || state.inputValue === slug
    || !!state.error;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState({
      ...state,
      error: null,
      loading: true,
    });

    try {
      const { errors } = await editSiteName({
        errorPolicy: 'all',
        variables: {
          input: {
            siteId,
            name: state.inputValue,
          },
        },
      });

      if (errors) {
        let errorMessage;

        if (Array.isArray(errors)) {
          errorMessage = errors[0].message;
        } else {
          errorMessage = errors.message;
        }

        setState({
          ...state,
          loading: false,
          error: errorMessage,
        });
        return;
      }

      history.push(url.buildUrl(null, `/sites/${state.inputValue}/overview`));
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      error: null,
      inputValue: event.target.value,
    });
  };

  return (
    <BaseModal
      open={open}
      maxWidth={438}
      onClose={onClose}
      className={classes.modal}
      title={t('modals.changeSiteName.title')}
    >
      <Typography
        variant="body2"
        color="textPrimary"
        className={classes.message}
      >
        {t('modals.changeSiteName.message')}
      </Typography>
      <form
        id="changeSiteNameForm"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <InputWithError
          error={!!state.error}
          value={state.inputValue}
          errorMessage={state.error}
          label={t('modals.changeSiteName.siteNameInput')}
          onChange={handleInputChange}
        />
        {
          !state.error && (
            <div className={classes.urlContainer}>
              <Typography variant="subtitle2" color="textSecondary">
                <span>https://</span>
                <Typography component="span" variant="subtitle2">{state.inputValue || slug}</Typography>
                <span>{util.getFleekSubdomain()}</span>
              </Typography>
            </div>
          )
        }
        <div className={classes.buttons}>
          <GenericButton
            onClick={onClose}
            buttonVariant="secondary"
            disabled={state.loading}
          >
            {t('common.cancel')}
          </GenericButton>
          <GenericButton
            type="submit"
            form="changeSiteNameForm"
            buttonVariant="primary"
            loading={state.loading}
            disabled={disableConfirmButton}
          >
            {t('common.confirm')}
          </GenericButton>
        </div>
      </form>
    </BaseModal>
  );
};

ChangeSiteNameModal.defaultProps = {
  open: false,
};

ChangeSiteNameModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  siteBySlug: PropTypes.shape({}).isRequired,
};

export default ChangeSiteNameModal;
