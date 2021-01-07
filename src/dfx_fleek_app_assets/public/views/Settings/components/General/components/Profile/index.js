import React from 'react';
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import List from '@terminal-packages/ui/core/List';
import ListItem from '@terminal-packages/ui/core/ListItem';
import CardTitled from '@terminal-packages/ui/core/CardTitled';

import { oldApiClient } from '@Clients';
import { CURRENT_USER } from '@Shared/graphql/queries';

import useStyles from './styles';

const Profile = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { data, loading } = useQuery(CURRENT_USER, {
    client: oldApiClient,
  });

  const lastname = get(data, 'getCurrentUser.user.individual.lastname', '') || '';
  const firstname = get(data, 'getCurrentUser.user.individual.firstname', '') || '';

  const userDetailsEntries = Object.entries({
    name: (`${firstname} ${lastname}`).trim(),
    email: get(data, 'getCurrentUser.user.email', '') || '',
  });

  return (
    <>
      <Typography variant="body1">
        <Box component="span" fontWeight={500}>
          {t('accountSettings.profile.title')}
        </Box>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {t('accountSettings.profile.description')}
      </Typography>
      <br />
      <CardTitled
        mainContent={t('accountSettings.profile.card.title')}
        classes={{
          content: classes.content,
        }}
      >
        <List striped>
          {
            userDetailsEntries.map(([key, value]) => (
              <ListItem key={key} className={classes.item}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  className={classes.key}
                >
                  {`${t(`accountSettings.profile.card.${key}`)}:`}
                </Typography>
                {
                  loading ? (
                    <Skeleton
                      width={240}
                      height={20}
                      variant="rect"
                      animation="wave"
                      classes={{
                        root: classes.skeletonRoot,
                      }}
                    />
                  ) : (
                    <Typography noWrap variant="body2">
                      <Box component="span" fontWeight={500}>
                        {value}
                      </Box>
                    </Typography>
                  )
                }
              </ListItem>
            ))
          }
        </List>
      </CardTitled>
    </>
  );
};

export default Profile;
