import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CardTitled from '@terminal-packages/ui/core/CardTitled';

import useStyles from './styles';

const Header = ({
  title,
  subtitle,
  description,
  children,
}) => {
  const classes = useStyles();

  return (
    <CardTitled
      mainContent={title}
      classes={{
        content: classes.sectionContent,
        root: classes.sectionRoot,
      }}
    >
      <Typography variant="body2" className={classes.title}>
        {subtitle}
      </Typography>
      {typeof description === 'string' ? (
        <Typography variant="caption" color="textSecondary">
          {description}
        </Typography>
      ) : description}
      {children}
    </CardTitled>
  );
};

Header.defaultProps = {
  children: null,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node,
};

export default Header;
