import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { IconFormat } from '@terminal-packages/ui/core/DataFormat';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading */
const LinkCLI = (props) => {
  const {
    className,
    ...restProps
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://docs.fleek.co/storage/fleek-storage-js"
      className={classnames(
        classes.root,
        className,
      )}
      {...restProps}
    >
      <Typography
        color="inherit"
        display="inline"
        variant="caption"
      >
        {t('layout.sidebar.getCLI')}
      </Typography>
      <IconFormat
        size={12}
        color="inherit"
        icon={['far', 'long-arrow-right']}
      />
    </a>
  );
};

LinkCLI.defaultProps = {
  className: null,
};

LinkCLI.propTypes = {
  className: PropTypes.string,
};

export default LinkCLI;
