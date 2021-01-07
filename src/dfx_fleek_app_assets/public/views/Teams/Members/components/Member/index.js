import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import ListItem from '@terminal-packages/ui/core/ListItem';

import MemberInfo from '../MemberInfo';
import MemberStatus from '../MemberStatus';
import MemberOptions from '../MemberOptions';

import useStyles from './styles';

import { MEMBER_ROLES, MEMBER_SLOT_TYPES } from '../../constants';

const getName = ({ firstname, lastname }) => {
  if (!firstname) {
    if (!lastname) {
      return null;
    }

    return lastname;
  }

  if (!lastname) {
    return firstname;
  }

  return `${firstname} ${lastname}`;
};

const getType = (member) => {
  if (member.member) {
    return MEMBER_SLOT_TYPES.member;
  }

  return MEMBER_SLOT_TYPES.invitation;
};

const Member = ({
  member,
  isCurrentUserTeamOwner,
}) => {
  const classes = useStyles();

  const lastname = get(member, 'member.lastname');
  const memberEmail = get(member, 'member.email');
  const firstname = get(member, 'member.firstname');
  const role = get(member, 'accessLevel') || 'member';
  const status = get(member, 'pendingMember.status') || '';
  const profilePic = get(member, 'member.profilePic', null);
  const invitationEmail = get(member, 'pendingMember.email');

  const type = getType(member);
  const name = getName({ firstname, lastname });

  return (
    <ListItem className={classes.member}>
      <MemberInfo
        name={name}
        profilePic={profilePic}
        email={memberEmail || invitationEmail}
      />
      <MemberStatus
        role={role}
        status={status}
      />
      {
        isCurrentUserTeamOwner && role === MEMBER_ROLES.member && (
          <MemberOptions
            type={type}
            id={member.id}
          />
        )
      }
    </ListItem>
  );
};

Member.propTypes = {
  isCurrentUserTeamOwner: PropTypes.bool.isRequired,
  member: PropTypes.shape({
    id: PropTypes.string,
    member: PropTypes.object,
    accessLevel: PropTypes.string,
    pendingMember: PropTypes.object,
  }).isRequired,
};

export default Member;
