import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import IconFA from '@terminal-packages/ui/core/IconFA';
import CardTitled from '@terminal-packages/ui/core/CardTitled';

import getItems from './get-items';
import useStyles from './styles';

const SummaryList = (props) => {
  const classes = useStyles(props);

  const { t } = useTranslation();

  const {
    deploy: {
      startedAt,
      completedAt,
    },
  } = props;
  const completedDate = moment(completedAt);
  const startedDate = moment(startedAt);
  const diffTime = moment(completedDate.diff(startedDate));
  const elapsedTime = diffTime.format('m[m ]s[s]');
  const { title, items } = getItems(t, {
    buildTime: elapsedTime,
    totalDeployTime: elapsedTime,
    startedAt: moment(startedAt).format('LTS'),
    endedAt: moment(completedAt).format('LTS'),
  });

  return (
    <CardTitled
      mainContent={title}
      className={classes.wrapper}
      classes={{
        title: classes.wrapper,
        content: classes.content,
      }}
    >
      {items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`summary-list-${index}`}>
          <div className={classes.title}>
            <IconFA
              className={classes.icon}
              icon={item.icon}
              fontSize="small"
            />
            <Typography className={classes.textTitle} variant="body1">
              {item.title}
            </Typography>
          </div>
          <Typography className={classes.textSubtitle} variant="body2">
            {item.subtitle}
          </Typography>
        </div>
      ))}
    </CardTitled>
  );
};

SummaryList.defaultProps = {
  deploy: {
    startedAt: '',
    completedAt: '',
  },
};

SummaryList.propTypes = {
  deploy: PropTypes.shape({
    startedAt: PropTypes.string,
    completedAt: PropTypes.string,
  }),
};

export default SummaryList;
