import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { url } from '@Shared';
import { MODAL_DEFAULT_OPEN, PAYMENT } from '../../views/Teams/Billing/General/constants';
import useStyles from './styles';

const SiteSuspendedOverlay = ({
  isShownOverlay,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const teamId = url.getAccountIdFromUrl();

  return (
    <div className={isShownOverlay ? classes.root : undefined}>
      {isShownOverlay && (
        <div className={classes.backdrop}>
          <Paper className={classes.modal}>
            <Typography className={classes.title}>
              {t('siteSuspendedOverlay.title')}
            </Typography>
            <Typography className={classes.description}>
              {t('siteSuspendedOverlay.description')}
            </Typography>
            <Link
              to={url.buildUrl({ [MODAL_DEFAULT_OPEN]: PAYMENT }, `/teams/${teamId}/billing/general`)}
            >
              <Button
                onClick={() => {}}
                color="primary"
                variant="contained"
                className={classes.button}
              >
                {t('siteSuspendedOverlay.buttonText')}
              </Button>
            </Link>
          </Paper>
        </div>
      )}
    </div>
  );
};

SiteSuspendedOverlay.propTypes = {
  isShownOverlay: PropTypes.bool.isRequired,
};

export default SiteSuspendedOverlay;
