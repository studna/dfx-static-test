import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';

import MoreVert from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';

import { toast } from '@terminal-packages/ui/core/Toast';
import Spinner from '@terminal-packages/ui/core/Spinner';
import ListItem from '@terminal-packages/ui/core/ListItem';
import MenuDropdown from '@terminal-packages/ui/core/MenuDropdown';

import { newApiClient } from '@Clients';
import { GET_MEMBERS_BY_TEAM } from '@Shared/graphql/queries';
import { REMOVE_TEAM_MEMBER_SLOT } from '@Shared/graphql/mutations';

import useStyles from './styles';

const MemberOptions = ({
  id,
  type,
}) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    isLoading: false,
  });

  const { teamId } = match.params;

  const [removeTeamMemberSlot] = useMutation(REMOVE_TEAM_MEMBER_SLOT, {
    client: newApiClient,
    update: (cache) => {
      try {
        const data = cache.readQuery({
          query: GET_MEMBERS_BY_TEAM,
          variables: {
            teamId,
          },
        });

        const newMembersByTeam = data.getMembersByTeam.filter((memberSlot) => {
          if (memberSlot.member) {
            return memberSlot.member.id !== id;
          }

          return memberSlot.pendingMember.id !== id;
        });

        cache.writeQuery({
          query: GET_MEMBERS_BY_TEAM,
          variables: {
            teamId,
          },
          data: {
            ...data,
            getMembersByTeam: newMembersByTeam,
          },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error when trying to update GET_TEAM_MEMBERS query: ', error.message);
      }
    },
  });

  const handleRemoveMember = async (event) => {
    event.preventDefault();

    setState({
      isLoading: true,
    });

    try {
      await removeTeamMemberSlot({
        variables: {
          input: {
            type,
            teamId,
            memberSlotId: id,
          },
        },
      });

      toast.success(
        t('members.removeMember.success'),
        { autoClose: 6000 },
      );
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));

      // eslint-disable-next-line no-console
      console.error('Error when trying to remove a member: ', error.message);

      toast.error(
        t('members.removeMember.error'),
        { autoClose: 6000 },
      );
    }
  };

  return (
    <MenuDropdown
      menuId="menu-dropdown-member-options"
      trigger={(
        <IconButton
          disableRipple
          disableFocusRipple
          classes={{
            root: classes.iconButtonRoot,
          }}
        >
          <MoreVert />
        </IconButton>
      )}
    >
      <ListItem
        className={classes.memberOption}
        onClick={handleRemoveMember}
      >
        <ButtonBase
          type="button"
          className="remove-domain-button"
          onClick={handleRemoveMember}
        >
          {t('members.remove')}
          {
            state.isLoading && (
              <span className={classes.spinner}>
                <Spinner positioning="inline" />
              </span>
            )
          }
        </ButtonBase>
      </ListItem>
    </MenuDropdown>
  );
};

MemberOptions.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MemberOptions;
