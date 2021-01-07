import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';

import { newApiClient } from '@Clients';
import { url } from '@Shared/utils';
import { REMOVE_SITE } from '@Shared/graphql/mutations';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { updateCache } from './utils';
import useStyles from './styles';
import { GA_EVENTS_CATEGORIES } from '~/constants';

const DeleteSiteModal = ({
  open,
  onClose,
  siteBySlug,
}) => {
  const siteId = get(siteBySlug, 'data.getSiteBySlug.id', '');
  const slug = get(siteBySlug, 'data.getSiteBySlug.slug', '');
  const teamId = get(siteBySlug, 'data.getSiteBySlug.team.id', '');

  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [state, setState] = useState({
    error: null,
    loading: false,
    inputValue: '',
  });

  const [deleteSite] = useMutation(REMOVE_SITE, {
    client: newApiClient,
    update: (cache, { data: { removeSite } }) => updateCache(
      cache,
      removeSite,
      teamId,
    ),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState({
      ...state,
      error: null,
      loading: true,
    });

    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Confirm delete site', siteId);
    window.analytics.track('Confirm delete site', {
      teamId,
      siteId,
    });


    try {
      await deleteSite({
        variables: {
          input: {
            siteId,
          },
        },
      });

      setState({
        ...state,
        loading: false,
      });

      history.replace(url.buildUrl({}, `/teams/${teamId}/sites`));

      // to make response from getSiteBySlug query invalid
      newApiClient.cache.evict(`Site:${siteId}`);
      newApiClient.cache.gc();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Delete Site error: ', error.message);

      setState({
        ...state,
        loading: false,
        error: t('modals.deleteSite.error'),
      });
    }
  };

  const handleInputChange = (event) => {
    setState({
      ...state,
      inputValue: event.target.value,
    });
  };

  return (
    <BaseModal
      open={open}
      maxWidth={438}
      onClose={onClose}
      className={classes.modal}
      title={t('modals.deleteSite.title')}
    >
      {
        state.error && (
          <AlertBox
            type="error"
            message={state.error}
            className={classes.alert}
            icon={['fal', 'times-circle']}
          />
        )
      }
      <Typography className={classes.message} variant="body2" color="textSecondary">
        {t('modals.deleteSite.message.part1')}
        &nbsp;<span className={classes.siteSlug}>{`${slug}?`}</span>
        &nbsp;{t('modals.deleteSite.message.part2')}
      </Typography>
      <form id="deleteSiteForm" onSubmit={handleSubmit}>
        <InputWithError
          value={state.value}
          label={t('modals.deleteSite.siteNameInput')}
          onChange={handleInputChange}
        />
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
            form="deleteSiteForm"
            buttonVariant="important"
            loading={state.loading}
            disabled={state.loading || state.inputValue !== slug}
          >
            {t('common.delete')}
          </GenericButton>
        </div>
      </form>
    </BaseModal>
  );
};

DeleteSiteModal.defaultProps = {
  open: false,
};

DeleteSiteModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  siteBySlug: PropTypes.shape({}).isRequired,
};

export default DeleteSiteModal;
