import React from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import List from '@terminal-packages/ui/core/List';
import IconFA from '@terminal-packages/ui/core/IconFA';
import { toast } from '@terminal-packages/ui/core/Toast';
import ListItem from '@terminal-packages/ui/core/ListItem';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { newApiClient } from '@Clients';
import { GET_API_KEYS } from '@Shared/graphql/queries';
import {
  openModal,
  API_DETAILS_MODAL,
} from '@Shared/modals/actions';

import useStyles from './styles';

const handleCopy = ({ t, apiKey }) => (e) => {
  e.preventDefault();

  navigator.clipboard.writeText(apiKey);
  toast.success(t('accountSettings.api.card.copy'));
};

const Api = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data, loading } = useQuery(GET_API_KEYS, {
    client: newApiClient,
  });

  const apiKeys = get(data, 'getApiKeys.apiKeys', []) || [];

  return (
    <>
      <Typography variant="body1">
        <Box component="span" fontWeight={500}>
          {t('accountSettings.api.title')}
        </Box>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {t('accountSettings.api.description')}
      </Typography>
      <br />
      <CardTitled
        mainContent={t('accountSettings.api.card.title')}
        classes={{
          content: classes.content,
        }}
      >
        <List striped>
          {
            apiKeys.map(({ key }) => (
              <ListItem key={key} className={classes.item}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className={classes.key}
                >
                  {`${t('accountSettings.api.card.apiKey')}:`}
                </Typography>
                <Typography noWrap variant="body2">
                  <Box component="span" fontWeight={500}>
                    {key}
                  </Box>
                </Typography>
                <div className={classes.iconContainer}>
                  <IconFA
                    icon={['fal', 'copy']}
                    onClick={handleCopy({ t, apiKey: key })}
                  />
                </div>
              </ListItem>
            ))
          }
        </List>
        <br />
        <div className={classes.buttonContainer}>
          <GenericButton
            disabled={loading}
            buttonVariant="secondary"
            onClick={() => dispatch(openModal(API_DETAILS_MODAL, {}))}
          >
            {t('accountSettings.api.card.new')}
          </GenericButton>
        </div>
      </CardTitled>
    </>
  );
};

export default Api;
