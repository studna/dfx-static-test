import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import List from '@terminal-packages/ui/core/List';

import Member from '../Member';
import MemberSkeleton from '../MemberSkeleton';

const MemberList = ({
  loading,
  members,
  isCurrentUserTeamOwner,
}) => (
  <List striped>
    {
      loading && Array(2).fill().map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MemberSkeleton key={index} />
      ))
    }
    {
      !loading && members.map((member) => {
        const memberId = get(member, 'member.id');
        const invitationId = get(member, 'pendingMember.id');

        return (
          <Member
            key={memberId || invitationId}
            isCurrentUserTeamOwner={isCurrentUserTeamOwner}
            member={{
              ...member,
              id: memberId || invitationId,
            }}
          />
        );
      })
    }
  </List>
);

MemberList.propTypes = {
  loading: PropTypes.bool.isRequired,
  isCurrentUserTeamOwner: PropTypes.bool.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MemberList;
