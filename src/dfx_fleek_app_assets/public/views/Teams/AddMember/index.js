import React, { useState } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Box from '@terminal-packages/ui/core/Box';
import AlertBox from '@terminal-packages/ui/core/AlertBox';
import InputWithError from '@terminal-packages/ui/core/InputWithError';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';

import { url } from '@Shared';
import { newApiClient } from '@Clients';
import { INVITE_USER } from '@Shared/graphql/mutations';
import { openModal, PAYMENT_METHOD_MODAL } from '@Shared/modals/actions';
import { GET_TEAM_BY_ID, GET_MEMBERS_BY_TEAM } from '@Shared/graphql/queries';
import GoBackLink from '@Shared/Layout/components/GoBackLink';
import GET_TEAM_BILLING_INFORMATION from '@Shared/graphql/queries/get-team-billing-information';
import PaymentMethod from '~/views/Teams/shared/components/PaymentSummary/components/PaymentMethod';

import useStyles from './sharedStyles';
import MoreSeats from './components/MoreSeats';

const BASIC_PLAN_ID = 'basic_plan';

const AddMember = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [emailsInput, setEmailsInput] = useState('');
  const [errorMsg, setErrorMessage] = useState(null);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [showMoreSeats, setShowMoreSeats] = useState(false);

  const { params: { teamId } } = match;

  const getMembersByTeam = useQuery(GET_MEMBERS_BY_TEAM, {
    client: newApiClient,
    variables: {
      teamId,
    },
  });

  const {
    refetch: refetchBillintInfo,
    data: billingInfoData,
  } = useQuery(GET_TEAM_BILLING_INFORMATION, {
    client: newApiClient,
    variables: {
      teamId,
    },
  });

  const [
    sendInvitations,
    { loading: sendInvitationsLoading },
  ] = useMutation(
    INVITE_USER, {
      client: newApiClient,
      update: (cache, { data: { inviteUser } }) => {
        try {
          const data = cache.readQuery({
            query: GET_MEMBERS_BY_TEAM,
            variables: {
              teamId,
            },
          });

          const newMembers = [...data.getMembersByTeam];

          inviteUser.forEach((invite) => {
            newMembers.push({
              member: null,
              accessLevel: null,
              __typename: 'MemberSlot',
              pendingMember: {
                ...invite,
              },
            });
          });

          cache.writeQuery({
            query: GET_MEMBERS_BY_TEAM,
            variables: {
              teamId,
            },
            data: {
              ...data,
              getMembersByTeam: newMembers,
            },
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error when trying to update GET_SITES_BY_TEAM query: ', error.message);
        }
      },
    },
  );

  const newCreditCardAction = () => dispatch(openModal(PAYMENT_METHOD_MODAL, {
    onSuccess: () => {
      refetchBillintInfo();
    },
  }));

  const getTeamById = useQuery(GET_TEAM_BY_ID, {
    client: newApiClient,
    fetchPolicy: 'network-only',
    variables: {
      id: teamId,
    },
  });

  const seatCount = get(getTeamById, 'data.getTeamById.seatCount', 0);
  const membersByTeam = get(getMembersByTeam, 'data.getMembersByTeam', []);
  const membersCount = get(getTeamById, 'data.getTeamById.membersCount', 0);
  const pendingInviteCount = get(getTeamById, 'data.getTeamById.pendingInviteCount', 0);
  const selectedPlanId = get(billingInfoData, 'getTeamBillingInformation.activePlan.selectedPlan.id', '');
  const paymentMethod = get(billingInfoData, 'getTeamBillingInformation.paymentMethod', null);
  const costPerAdditionalMembers = get(billingInfoData, 'getTeamBillingInformation.activePlan.selectedPlan.extraTeamMemberPrice', '0');

  const disableInviteButton = emailsInput === '' || sendInvitationsLoading || (showMoreSeats && !paymentMethod);

  const validateEmails = (emails) => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let validInput = true;
    emails.forEach((email) => {
      const isValid = emailRegEx.test(email);
      if (!isValid) validInput = false;
    });
    return validInput;
  };

  const validateDuplicateEmails = (membersInput) => {
    const emailsDuplicated = [];

    membersInput.forEach((email) => {
      const duplicateEmail = membersByTeam.find((member) => {
        if (member.member) {
          return member.member.email === email;
        }

        return member.pendingMember.email === email;
      });

      if (duplicateEmail) {
        emailsDuplicated.push(email);
      }
    });

    return emailsDuplicated;
  };

  const goToMembersPage = () => {
    const destinationUrl = url.buildUrl(null, `/teams/${match.params.teamId}/members`);
    history.push(destinationUrl);
  };

  const handleBackButton = () => {
    goToMembersPage();
  };

  const handleEmailInput = (e) => {
    setEmailsInput(e.target.value);
    if (errorMsg) {
      setErrorMessage(null);
    }
    if (showMoreSeats) {
      setShowMoreSeats(false);
    }
    if (showAlertBox) {
      setShowAlertBox(false);
    }
  };

  const handleSubmit = async () => {
    if (showAlertBox) {
      setShowAlertBox(false);
    }
    let membersInput = emailsInput.replace(/ /g, '');
    if (membersInput === '') {
      setErrorMessage(t('members.addMember.emails.noEmailAddress'));
      return;
    }
    membersInput = membersInput.split(',');

    const isInputValid = validateEmails(membersInput);

    if (!isInputValid) {
      setErrorMessage(t('members.addMember.emails.invalidEmail'));
      return;
    }

    const duplicatedEmails = validateDuplicateEmails(membersInput);

    if (duplicatedEmails.length > 0) {
      setErrorMessage(t('members.addMember.emails.duplicate', {
        count: duplicatedEmails.length,
        emails: duplicatedEmails.join(', '),
      }));
      return;
    }

    if (!showMoreSeats) {
      const totalNewMembers = emailsInput.split(',').length;
      const totalMembersWithNewMembers = totalNewMembers + membersCount + pendingInviteCount;

      if (totalMembersWithNewMembers > seatCount || selectedPlanId === BASIC_PLAN_ID) {
        setShowMoreSeats(true);
        return;
      }
    }

    window.analytics.track('Member(s) invited', {
      teamId,
    });

    try {
      await sendInvitations({
        variables: {
          teamId,
          emails: membersInput,
        },
      });

      goToMembersPage();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setShowAlertBox(true);
    }
  };

  const getMoreSeatsSection = () => {
    const totalNewMembers = emailsInput.split(',').length;
    const totalMembersWithNewMembers = totalNewMembers + membersCount + pendingInviteCount;
    const extraSeats = Math.abs(totalMembersWithNewMembers - seatCount);
    const monthlyCost = parseInt(costPerAdditionalMembers, 10) * extraSeats;

    return (
      <>
        <MoreSeats
          totalNewMembers={totalNewMembers}
          extraSeats={extraSeats}
          monthlyCost={monthlyCost}
        />
        {
          selectedPlanId === BASIC_PLAN_ID && (
            <PaymentMethod
              showTitle={false}
              newCreditCardAction={newCreditCardAction}
              creditCardType={get(paymentMethod, 'issuer', '')}
              creditCardFourLastDigits={get(paymentMethod, 'card.lastCardNumbers', '')}
            />
          )
        }
      </>
    );
  };

  React.useEffect(() => {
    window.analytics.page('Add Team Member', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <div>
      <GoBackLink onClick={handleBackButton} />
      <Box
        padding="37px 290px 48px 58px"
        overrideClass={{
          wrapper: classes.boxWrapper,
        }}
      >
        <Typography className={classes.title}>
          {t('members.addMember.title')}
        </Typography>
        <Typography className={classes.subtitle}>
          {t('members.addMember.subtitle')}
        </Typography>
        <div className={classes.emailContainer}>
          <Typography className={classes.sectionTitle}>
            {t('members.addMember.emails.title')}
          </Typography>
          <Typography className={classes.subtitle}>
            {t('members.addMember.emails.subtitle')}
          </Typography>
          <InputWithError
            value={emailsInput}
            label={t('members.addMember.emails.fieldLabel')}
            onChange={handleEmailInput}
            error={!!errorMsg}
            errorMessage={errorMsg}
            className={classes.emailInput}
          />
        </div>
        {
          showAlertBox && (
            <AlertBox
              type="error"
              message={t('members.addMember.error.errorSendingInvitations')}
              className={classes.alert}
              icon={['fal', 'times-circle']}
            />
          )
        }
        {showMoreSeats && getMoreSeatsSection()}
        <GenericButton
          onClick={handleSubmit}
          buttonVariant="primary"
          color="primary"
          disabled={disableInviteButton}
          loading={sendInvitationsLoading}
          className={classes.submitButton}
        >
          {t('members.addMember.buttonText')}
        </GenericButton>
      </Box>
    </div>
  );
};

export default AddMember;
