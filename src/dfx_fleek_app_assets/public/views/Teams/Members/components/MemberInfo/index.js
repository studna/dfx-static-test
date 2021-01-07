import React from 'react';
import PropTypes from 'prop-types';

import IconFA from '@terminal-packages/ui/core/IconFA';

import useStyles from './styles';

const MemberInfo = ({
  name,
  email,
  profilePic,
}) => {
  const classes = useStyles({ name });

  const profielPicComponent = profilePic
    ? <img alt={name} src={profilePic} />
    : <IconFA icon={['fal', 'user']} />;

  return (
    <div className={classes.memberInfo}>
      <div className={classes.memberAvatar}>
        {profielPicComponent}
      </div>
      <div className={classes.memberData}>
        <p className="user-name">{!name ? email : name}</p>
        <p className="user-email">{email}</p>
      </div>
    </div>
  );
};

MemberInfo.defaultProps = {
  name: null,
  profilePic: null,
};

MemberInfo.propTypes = {
  name: PropTypes.string,
  profilePic: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default MemberInfo;
