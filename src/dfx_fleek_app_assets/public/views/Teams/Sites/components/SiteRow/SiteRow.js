import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IconFA from '@terminal-packages/ui/core/IconFA';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import moment from 'moment';
import { getSiteDateText } from '@Shared';
import { DEPLOY_STATUS } from '~/constants';
import useStyles from './styles';

const SiteRow = (props) => {
  const {
    i18n,
    site,
    isPlaceholder,
  } = props;

  const {
    ipfsUrl,
    imageUrl,
    siteName,
    githubUrl,
    siteOwner,
    lastPublishedTimestamp,
    cardOnClickDestination,
    status,
  } = site;

  const { t } = useTranslation();
  const classes = useStyles(props);

  const getImage = () => {
    if (imageUrl && !isPlaceholder) {
      return (
        <div className={classes.imageContainer}>
          <img
            src={imageUrl}
            alt="site preview"
            className={classes.image}
          />
        </div>
      );
    }
    return (
      <div className={classes.imageContainer}>
        <div className={classes.imagePlaceholder}>
          <div className={classes.placeholderIconContainer}>
            <IconFA icon={['fal', 'image']} fontSize="inherit" />
          </div>
        </div>
      </div>
    );
  };

  const getSiteName = () => {
    if (isPlaceholder || !siteName) {
      return (
        <Typography className={classnames(
          classes.mainText,
          classes.greyColor,
        )}
        >
          {i18n.addNewSite}
        </Typography>
      );
    }
    return (
      <Typography className={classes.mainText}>
        {siteName}
      </Typography>
    );
  };

  const getDeployInfo = () => {
    let ipfs = null;
    let github = null;
    if (isPlaceholder || !githubUrl) {
      github = <span>{i18n.github}</span>;
    } else {
      github = (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.deployLink}
          onClick={(e) => e.stopPropagation()}
        >
          {i18n.github}
        </a>
      );
    }

    if (isPlaceholder || !githubUrl) {
      ipfs = <span>{i18n.ipfs}</span>;
    } else {
      ipfs = (
        <a
          href={ipfsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.deployLink}
          onClick={(e) => e.stopPropagation()}
        >
          {i18n.ipfs}
        </a>
      );
    }

    return (
      <Typography className={classes.subText}>
        {`${i18n.deployFrom} `}
        {github}
        {` ${i18n.andSymbol} `}
        {ipfs}
      </Typography>
    );
  };

  const getSiteOwner = () => {
    let shownText = i18n.ownedBy;
    if (!isPlaceholder && siteOwner) {
      shownText += ` ${siteOwner}`;
    }

    return (
      <Typography className={classnames(classes.mainText, {
        [classes.greyColor]: isPlaceholder || !siteOwner,
      })}
      >
        {shownText}
      </Typography>
    );
  };

  const getStatusField = () => {
    let shownText;
    switch (status) {
      case DEPLOY_STATUS.DEPLOYED:
        shownText = i18n.lastPublished;
        if (lastPublishedTimestamp) {
          const fromNow = moment(lastPublishedTimestamp).fromNow();
          const date = getSiteDateText(t, {
            isPublished: true,
            createdAt: undefined,
            lastPublishAt: lastPublishedTimestamp,
          });
          shownText = `${date} (${fromNow})`;
        }
        break;
      case DEPLOY_STATUS.FAILED:
      case DEPLOY_STATUS.CANCELLED:
        shownText = i18n.failedDeploy;
        break;
      case DEPLOY_STATUS.IN_PROGRESS:
        shownText = i18n.deployInProgress;
        break;
      default:
        shownText = '';
    }

    if (isPlaceholder) {
      shownText = i18n.lastPublished;
    }

    return (
      <Typography className={classes.subText}>
        {shownText}
      </Typography>
    );
  };

  const getArrow = () => (
    <IconFA
      icon={['fal', 'angle-right']}
      fontSize="inherit"
      color="inherit"
    />
  );

  const getRow = () => (
    <div className={classes.rowContainer}>
      {getImage()}
      <div className={classes.siteInfoContainer}>
        {getSiteName()}
        {getDeployInfo()}
      </div>
      <div className={classes.siteOwnerInfoContainer}>
        {getSiteOwner()}
        {getStatusField()}
      </div>
      <div
        className={classnames({
          [classes.endArrowContainer]: true,
          [classes.greyColor]: isPlaceholder,
        })}
      >
        <div
          className={classnames({
            [classes.endArrowClickable]: !isPlaceholder,
            [classes.endArrowBasic]: true,
          })}
        >
          {getArrow()}
        </div>
      </div>
    </div>
  );

  if (!isPlaceholder && cardOnClickDestination) {
    return (
      <div className={classes.root}>
        <Link
          to={cardOnClickDestination}
          className={classes.cardLink}
        >
          {getRow()}
        </Link>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {getRow()}
    </div>
  );
};


SiteRow.defaultProps = {
  isPlaceholder: false,
  site: {
    imageUrl: null,
    githubUrl: null,
    ipfsUrl: null,
    isPlaceholder: false,
    siteName: null,
    siteOwner: null,
    lastPublishedTimestamp: null,
    cardOnClickDestination: null,
    status: '',
  },
};

SiteRow.propTypes = {
  isPlaceholder: PropTypes.bool,
  site: PropTypes.shape({
    ipfsUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    siteName: PropTypes.string,
    githubUrl: PropTypes.string,
    siteOwner: PropTypes.string,
    lastPublishedTimestamp: PropTypes.string,
    cardOnClickDestination: PropTypes.string,
    status: PropTypes.string,
  }),
  i18n: PropTypes.shape({
    deployFrom: PropTypes.string.isRequired,
    addNewSite: PropTypes.string.isRequired,
    ownedBy: PropTypes.string.isRequired,
    lastPublished: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    ipfs: PropTypes.string.isRequired,
    andSymbol: PropTypes.string.isRequired,
    at: PropTypes.string.isRequired,
    deployInProgress: PropTypes.string.isRequired,
    failedDeploy: PropTypes.string.isRequired,
  }).isRequired,
};

export default SiteRow;
