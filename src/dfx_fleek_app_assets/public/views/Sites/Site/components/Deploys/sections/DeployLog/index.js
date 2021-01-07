import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { Element, scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { copyToClipboard } from '@terminal-packages/ui/core/CopyToClipboardButton/utils';
import { toast } from '@terminal-packages/ui/core/Toast';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import { ID_OF_SCROLLABLE_ELEMENT } from '~/constants';
import useStyles from './styles';
import getI18n from './i18n';

const DeployLog = ({
  previewDestination,
  showPreviewButton,
  contentText,
  loading,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const i18n = getI18n(t);
  const oldContentText = useRef(null);

  useEffect(() => {
    if (oldContentText.current !== null && oldContentText.current !== contentText) {
      scroller.scrollTo('log-bottom', {
        duration: 1500,
        delay: 100,
        smooth: true,
        containerId: ID_OF_SCROLLABLE_ELEMENT,
        offset: -10,
      });
    }
    if (!loading) {
      oldContentText.current = contentText;
    }
  }, [contentText, loading]);

  const dateToLocalFormat = (date) => (moment(date).format('LTS L'));

  const getFormattedLogs = () => {
    if (!contentText) {
      return '';
    }

    const serverDateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/g;
    const newText = contentText.replace(serverDateFormat, (date) => dateToLocalFormat(date));

    return newText;
  };

  const copyToClipboardOnClick = () => {
    copyToClipboard(contentText);
    toast.success(i18n.sucessfullyCopied);
  };

  const getPreviewButton = () => {
    if (previewDestination) {
      return (
        <a
          href={previewDestination}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.previewLink}
        >
          <GenericButton
            buttonVariant="primary"
            onClick={() => {}}
            overrideClass={{
              button: classes.buttons,
            }}
          >
            {t(i18n.preview)}
          </GenericButton>
        </a>
      );
    }
    return (
      <GenericButton
        buttonVariant="primary"
        disabled
        onClick={() => {}}
        overrideClass={{
          button: classes.buttons,
        }}
      >
        {t(i18n.preview)}
      </GenericButton>
    );
  };

  const header = (
    <>
      <Typography variant="body1" color="textPrimary">
        <Box fontWeight={500}>
          {i18n.title}
        </Box>
      </Typography>
      <div className={classes.buttonsContainer}>
        {showPreviewButton && (
          <>
            {getPreviewButton()}
          </>
        )}
        <div className={classes.copyToClipboardButtonContainer}>
          <GenericButton
            buttonVariant="secondary"
            onClick={copyToClipboardOnClick}
            overrideClass={{
              button: classes.buttons,
            }}
          >
            {t(i18n.copyToClipboard)}
          </GenericButton>
        </div>
      </div>
    </>
  );

  return (
    <div className={classes.box}>
      <CardTitled mainContent={header} classes={{ content: classes.noPadding }}>
        <div className={classes.contextTextContainer}>
          <Typography className={classes.contentText}>
            {getFormattedLogs()}
          </Typography>
        </div>
        <Element name="log-bottom" />
      </CardTitled>
    </div>
  );
};

DeployLog.defaultProps = {
  showPreviewButton: false,
  contentText: null,
  previewDestination: '',
};

DeployLog.propTypes = {
  showPreviewButton: PropTypes.bool,
  contentText: PropTypes.string,
  previewDestination: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DeployLog;
