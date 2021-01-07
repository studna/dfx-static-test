import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import FleekUIBox from '@terminal-packages/ui/core/Box';
import { toast } from '@terminal-packages/ui/core/Toast';

import { oldApiClient } from '@Clients';
import { CURRENT_USER } from '@Shared/graphql/queries';

import useStyles from './styles';

const SKELETON_VARIANT = 'rect';
const SKELETON_ANIMATION = 'wave';

const SettingsView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { data, error, loading } = useQuery(CURRENT_USER, {
    client: oldApiClient,
  });

  const getContent = () => {
    if (loading) {
      return (
        <>
          <Skeleton
            width={190}
            height={25}
            variant={SKELETON_VARIANT}
            animation={SKELETON_ANIMATION}
            classes={{
              root: classes.skeletonRoot,
            }}
          />
          <Skeleton
            width={240}
            height={20}
            variant={SKELETON_VARIANT}
            animation={SKELETON_ANIMATION}
            classes={{
              root: classNames(classes.skeletonRoot, classes.accountEmail),
            }}
          />
          <Skeleton
            width={210}
            height={20}
            variant={SKELETON_VARIANT}
            animation={SKELETON_ANIMATION}
            classes={{
              root: classes.skeletonRoot,
            }}
          />
        </>
      );
    }

    const createdAt = get(data, 'getCurrentUser.user.createdAt');
    const email = get(data, 'getCurrentUser.user.email', '') || '';
    const lastname = get(data, 'getCurrentUser.user.individual.lastname', '') || '';
    const firstname = get(data, 'getCurrentUser.user.individual.firstname', '') || '';

    return (
      <>
        <Typography variant="h6" color="textPrimary">
          <Box component="span" fontWeight={500}>
            {(`${firstname} ${lastname}`).trim()}
          </Box>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.accountEmail}
        >
          {email}
        </Typography>
        {
          createdAt && (
            <Typography variant="body2" color="textSecondary">
              {t('accountSettings.join', { date: moment(createdAt).format('MMM DD, YYYY') })}
            </Typography>
          )
        }
      </>
    );
  };

  React.useEffect(() => {
    if (error) {
      toast.error(t('accountSettings.error'));
    }
  }, [error]);

  return (
    <FleekUIBox
      overrideClass={{
        wrapper: classes.accountHeaderCard,
      }}
      padding="22px 27px 27px 27px"
    >
      {getContent()}
    </FleekUIBox>
  );
};

export default SettingsView;
