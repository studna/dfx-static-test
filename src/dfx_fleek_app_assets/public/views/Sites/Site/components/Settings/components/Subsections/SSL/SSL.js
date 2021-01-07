import React from 'react';
import PropTypes from 'prop-types';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import components from './components';
import useStyles from './sharedStyles';

const SSL = ({
  i18n,
  status,
  ...restProps
}) => {
  const classes = useStyles();

  const getContent = () => {
    const Component = components[status] || components.default;
    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <Component
        i18n={i18n}
        {...restProps}
      />
    );
  };

  return (
    <CardTitled
      mainContent={i18n.title}
      classes={{ content: classes.cardTitledContent }}
    >
      {getContent()}
    </CardTitled>
  );
};

SSL.defaultProps = {
  i18n: {},
  status: 'error',
  buttonOnClick: () => {},
  certificate: '',
  domains: [''],
  expires: '',
  created: '',
};

SSL.propTypes = {
  i18n: PropTypes.shape({
    title: PropTypes.string,
  }),
  status: PropTypes.string,
  errorDocsLink: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func,
  certificate: PropTypes.string,
  domains: PropTypes.arrayOf(PropTypes.string),
  expires: PropTypes.string,
  created: PropTypes.string,
};

export default SSL;
