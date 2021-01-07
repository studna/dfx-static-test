import React from 'react';
import { Trans } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

const TopBanner = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>
        <Trans
          i18nKey="topBanner.message"
          components={[
            <a
              className={classes.link}
              href="https://blog.fleek.co/posts/daemon-release"
              target="_blank"
              rel="noopener noreferrer"
            >
              LEARN MORE
            </a>,
          ]}
        />
      </Typography>
    </div>
  );
};

export default TopBanner;
