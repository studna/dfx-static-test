/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CardTitled from '@terminal-packages/ui/core/CardTitled';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import useStyles from './styles';

const DangerZone = ({
  i18n,
  onDeleteSite,
}) => {
  const classes = useStyles();
  return (
    <CardTitled
      mainContent={i18n.title}
      classes={{
        content: classes.sectionContent,
      }}
    >
      <Typography variant="body2">
        {i18n.content}
      </Typography>
      <GenericButton
        overrideClass={{
          button: classes.button,
        }}
        buttonVariant="important"
        onClick={onDeleteSite}
      >
        <Typography variant="body2">
          {i18n.deleteSite}
        </Typography>
      </GenericButton>
    </CardTitled>
  );
};

DangerZone.propTypes = {
  i18n: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    deleteSite: PropTypes.string,
  }).isRequired,
  onDeleteSite: PropTypes.func.isRequired,
};

export default DangerZone;
