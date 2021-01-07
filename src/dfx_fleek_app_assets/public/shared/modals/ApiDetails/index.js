import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';

import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconFA from '@terminal-packages/ui/core/IconFA';
import { toast } from '@terminal-packages/ui/core/Toast';
import BaseModal from '@terminal-packages/ui/core/BaseModal';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { newApiClient } from '@Clients';
import { GET_API_KEYS } from '@Shared/graphql/queries';
import { GENERATE_API_KEY } from '@Shared/graphql/mutations';

import useStyles from './styles';

const handleCopy = ({ t, type, text }) => (e) => {
  e.preventDefault();

  navigator.clipboard.writeText(text);
  toast.success(t('modals.apiDetails.copy', { type }));
};

const ApiDetailsModal = ({
  open,
  closeModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    error: null,
    loading: true,
    apiKey: '',
    apiSecret: '',
  });

  const [generateApiKeyMutation] = useMutation(GENERATE_API_KEY, {
    client: newApiClient,
    update: (cache, { data: { generateApiKey } }) => {
      try {
        const data = cache.readQuery({
          query: GET_API_KEYS,
        });

        const newApiKeys = [...data.getApiKeys.apiKeys, { ...generateApiKey }];

        cache.writeQuery({
          query: GET_API_KEYS,
          data: {
            ...data,
            getApiKeys: {
              ...data.getApiKeys,
              apiKeys: newApiKeys,
            },
          },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error when trying to update GET_API_KEYS query: ', error.message);
      }
    },
  });

  React.useEffect(() => {
    const generateKey = async () => {
      try {
        const { data } = await generateApiKeyMutation();

        const apiKey = get(data, 'generateApiKey.key', '');
        const apiSecret = get(data, 'generateApiKey.secret', '');

        setState({
          ...state,
          apiKey,
          apiSecret,
          loading: false,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Generate api error: ', error.message);

        toast.error(t('modals.apiDetails.error'));
        setState({
          ...state,
          loading: false,
        });
      }
    };

    generateKey();
  }, []);

  return (
    <BaseModal
      open={open}
      maxWidth={472}
      onClose={closeModal}
      className={classes.root}
      title={t('modals.apiDetails.title')}
    >
      <div className={classes.content}>
        <InputWithError
          value={state.apiKey}
          label={t('modals.apiDetails.inputs.apiKey')}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <div className={classes.iconContainer}>
                  <IconFA
                    icon={['fal', 'copy']}
                    onClick={handleCopy({ t, type: 'key', text: state.apiKey })}
                  />
                </div>
              </InputAdornment>
            ),
          }}
        />
        <InputWithError
          value={state.apiSecret}
          label={t('modals.apiDetails.inputs.apiSecret')}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <div className={classes.iconContainer}>
                  <IconFA
                    icon={['fal', 'copy']}
                    onClick={handleCopy({ t, type: 'secret', text: state.apiSecret })}
                  />
                </div>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.warning}>
          <Typography variant="subtitle2">
            {t('modals.apiDetails.warning')}
          </Typography>
        </div>
      </div>
      <div className={classes.buttons}>
        <GenericButton
          onClick={closeModal}
          disabled={state.loading}
          buttonVariant="secondary"
        >
          {t('common.cancel')}
        </GenericButton>
        <GenericButton
          onClick={closeModal}
          loading={state.loading}
          disabled={state.loading}
          buttonVariant="primary"
        >
          {t('common.done')}
        </GenericButton>
      </div>
    </BaseModal>
  );
};

ApiDetailsModal.defaultProps = {
  open: false,
};

ApiDetailsModal.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
};

export default ApiDetailsModal;
