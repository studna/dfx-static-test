import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Skeleton from '@material-ui/lab/Skeleton';

import Box from '@terminal-packages/ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StatusText, { Status } from '@terminal-packages/ui/core/StatusText';
import PreviewBox, { IconName } from '@terminal-packages/ui/core/PreviewBox';
import { getGatewayUrl } from '@Shared/utils';

import useStyles from './styles';

const FileCard = (props) => {
  const {
    url,
    icon,
    status,
    ipfsHash,
    fileName,
    imageSrc,
    loadingHash,
    loadingInfo,
    lastModification,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const getHash = () => {
    if (!ipfsHash && loadingHash) {
      return (
        <Skeleton
          width={130}
          height={20}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      );
    }

    if (!ipfsHash) {
      return (
        <Typography
          variant="body2"
          className={classes.ipfsPending}
        >
          {t('sites.siteHeader.ipfs.pending')}
        </Typography>
      );
    }

    return (
      <a
        href={getGatewayUrl(ipfsHash)}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.ipfs}
      >
        <Typography variant="body2">
          {t('sites.siteHeader.ipfs.verify')}
        </Typography>
      </a>
    );
  };

  const getLastModification = () => {
    if (loadingInfo) {
      return (
        <Skeleton
          width={150}
          height={20}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      );
    }

    return (
      <Typography
        variant="body2"
        display="inline"
        color="textSecondary"
        className={classes.lastModifiedDate}
      >
        {lastModification}
      </Typography>
    );
  };

  const getPreviewBox = () => {
    if (!icon) {
      return null;
    }

    if (loadingInfo) {
      return (
        <Skeleton
          width={250}
          height={112}
          variant="rect"
          animation="wave"
          classes={{
            root: classes.skeletonRoot,
          }}
        />
      );
    }

    return (
      <PreviewBox
        icon={icon}
        imageSrc={imageSrc}
      />
    );
  };

  return (
    <Box
      padding="11px 15px 11px 27px"
      overrideClass={{
        wrapper: classes.root,
      }}
    >
      <div className={classes.textContainer}>
        <div className={classes.row}>
          <Typography
            variant="h6"
            display="inline"
            className={classes.fileName}
            noWrap
          >
            {fileName}
          </Typography>
          {getLastModification()}
        </div>
        <div className={classes.objectUrl}>
          <a
            href={`https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.urlLink}
          >
            <StatusText noWrap status={status} variant="body2">
              {url}
            </StatusText>
          </a>
        </div>
        <div className={classes.row}>
          <img
            alt="Ipfs logo"
            className={classes.ipfsIcon}
            src="https://storage.googleapis.com/terminal-assets/images/wallets/ipfs.svg"
          />
          {getHash()}
        </div>
      </div>
      <div>
        {getPreviewBox()}
      </div>
    </Box>
  );
};

FileCard.defaultProps = {
  fileName: '',
  lastModification: '',
  url: '',
  status: Status.Success,
  ipfsHash: null,
  imageSrc: null,
  icon: null,
  loadingHash: false,
  loadingInfo: false,
};

FileCard.propTypes = {
  fileName: PropTypes.string,
  lastModification: PropTypes.string,
  url: PropTypes.string,
  ipfsHash: PropTypes.string,
  imageSrc: PropTypes.string,
  loadingHash: PropTypes.bool,
  loadingInfo: PropTypes.bool,
  icon: PropTypes.oneOf([
    IconName.Zip,
    IconName.File,
    IconName.Folder,
  ]),
  status: PropTypes.oneOf([
    Status.Error,
    Status.Success,
    Status.Warning,
  ]),
};

export default FileCard;
