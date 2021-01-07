import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { url, useAccountId } from '@Shared';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_TEAM_BILLING_INFORMATION } from '@Shared/graphql/queries';
import { teamBillingInformationMockup } from '@Shared/graphql/mock-data';
import {
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import Box from '@terminal-packages/ui/core/Box';

import { newApiClient } from '@Clients';
import GoBackLink from '@Shared/Layout/components/GoBackLink';

import { GA_EVENTS_CATEGORIES } from '~/constants';

import {
  openModal,
  PAYMENT_METHOD_MODAL,
} from '../../../../../shared/modals/actions';

import {
  BuyDomain,
  DomainName,
  VerifyAction,
  OwningConfirmation,
  PurchasingDomain,
} from '../../components';

import { VERIFY_DOMAIN_AVAILABILITY } from '../../../graphql/queries';

import { SECTION_IDS } from '../../../Site/components/Settings/get-navigation-items';
import {
  ADD_CUSTOM_DOMAIN,
} from '../../../graphql/mutations';

const STEPS = {
  VERIFYING_DOMAIN: 'VERIFYING_DOMAIN',
  OWNING_CONFIRMATION: 'OWNING_CONFIRMATION',
  PURCHASING_DOMAIN: 'PURCHASING_DOMAIN',
  BUY_DOMAIN: 'BUY_DOMAIN',
};

const mapCurrentToPreviousStep = {
  OWNING_CONFIRMATION: 'VERIFYING_DOMAIN',
  PURCHASING_DOMAIN: 'OWNING_CONFIRMATION',
};

const AddCustomDomainForm = ({ siteId, siteSlug }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const teamId = useAccountId();

  const {
    refetch: refetchGetTeamBillingInfo,
    data: billingInfoData = teamBillingInformationMockup,
  } = useQuery(GET_TEAM_BILLING_INFORMATION, {
    client: newApiClient,
    variables: { teamId },
  });

  const paymentMethod = get(billingInfoData, 'getTeamBillingInformation.paymentMethod');

  const [addCustomDomainMutation] = useMutation(ADD_CUSTOM_DOMAIN, {
    client: newApiClient,
  });

  const [state, setState] = useState({
    error: null,
    loading: false,
    domainName: '',
    rootDomain: '',
    step: STEPS.VERIFYING_DOMAIN,
    enableEdit: true,
    price: 0,
    period: 0,
    currency: null,
  });

  useEffect(() => {
    if (state.step === STEPS.BUY_DOMAIN) {
      setState({
        ...state,
        enableEdit: false,
      });
    } else {
      setState({
        ...state,
        enableEdit: true,
      });
    }

    return () => setState({ ...state, enableEdit: true });
  }, [state.step]);

  const handleVerify = async () => {
    setState({
      ...state,
      loading: true,
    });

    const startsWithWWW = /^www\./.test(state.domainName);
    const domain = startsWithWWW ? state.domainName.substring(4) : state.domainName;

    const rootDomain = domain.split('.').slice(-2).join('.');

    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Verify Domain on Add custom domain', domain);
    window.analytics.track('Verify Domain on Add custom domain', {
      teamId,
      siteId,
      domain,
    });

    try {
      const { data } = await newApiClient.query({
        query: VERIFY_DOMAIN_AVAILABILITY,
        variables: {
          domain,
        },
      });

      const price = get(data, 'verifyDomainAvailability.price');
      const period = get(data, 'verifyDomainAvailability.period');
      const currency = get(data, 'verifyDomainAvailability.currency');
      const available = get(data, 'verifyDomainAvailability.available');

      const nextStep = available
        ? STEPS.BUY_DOMAIN
        : STEPS.OWNING_CONFIRMATION;

      setState({
        ...state,
        rootDomain,
        loading: false,
        step: nextStep,
        price: price / 1e6,
        period,
        currency,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error verifying custom domain: ', error.message);

      setState({
        ...state,
        loading: false,
        error: t('addCustomDomain.errors.invalidDomain'),
      });
    }
  };

  const handleOwningConfirm = async () => {
    setState({
      ...state,
      loading: true,
    });

    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Yes I own the domain', state.domainName);
    const eventProperties = {
      teamId,
      siteId,
      domain: state.domainName,
    };

    try {
      const { data } = await addCustomDomainMutation({
        variables: {
          input: {
            siteId,
            domainName: state.domainName,
            teamId: url.getAccountIdFromUrl(),
          },
        },
      });

      window.analytics.track('Yes I own the domain', eventProperties);
      const success = get(data, 'addCustomDomain');

      if (success) {
        history.push(url.buildUrl(
          null,
          `/sites/${match.params.siteSlug}/settings/${SECTION_IDS.DOMAIN_MANAGEMENT}`,
        ));
      }
    } catch (error) {
      eventProperties.error = error.message;
      window.analytics.track('Yes I own the domain failed', eventProperties);

      // eslint-disable-next-line no-console
      console.error('Error verifying custom domain: ', error.message);
      setState({
        ...state,
        loading: false,
        error: error.message,
      });
    }
  };

  const onChangeDomainName = (value) => {
    const newState = {
      ...state,
      domainName: value.replace(/\s/, '').toLowerCase(),
      step: STEPS.VERIFYING_DOMAIN,
    };

    // reset form input error
    if (state.error) {
      newState.error = null;
    }

    setState(newState);
  };

  const onBuyDomain = async () => {
    const baseRedirectUrl = `/sites/${siteSlug}/settings/domain-management`;

    const successCallbackUrl = url.buildUrl(
      { successPayment: true },
      baseRedirectUrl,
    );

    const cancelCallbackUrl = url.buildUrl(
      { errorPayment: true },
      baseRedirectUrl,
    );

    setState({
      ...state,
      loading: true,
    });

    window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Buy domain', state.domainName);
    window.analytics.track('Buy Domain', {
      teamId,
      siteId,
      domain: state.domainName,
    });

    /* eslint-disable no-console */
    try {
      const { data } = await addCustomDomainMutation({
        variables: {
          input: {
            siteId,
            domainName: state.rootDomain,
            teamId: url.getAccountIdFromUrl(),
            buyDomainWithSavedPaymentMethod: true,
          },
        },
      });

      const success = get(data, 'addCustomDomain');

      if (success) history.push(successCallbackUrl);
    } catch (error) {
      console.error(error);

      history.push(cancelCallbackUrl);
    }

    setState({
      ...state,
      loading: false,
    });
  };

  const onAddPaymentMethod = () => {
    const onSuccess = () => refetchGetTeamBillingInfo();

    dispatch(openModal(PAYMENT_METHOD_MODAL, { onSuccess }));
  };

  const getCurrentStepComponent = () => {
    switch (state.step) {
      case STEPS.VERIFYING_DOMAIN:
        return (
          <VerifyAction
            loading={state.loading}
            onVerify={handleVerify}
            onCancel={history.goBack}
            /* Verify that the form input has a length to be valid
            * and has no error.
            */
            isFormValid={state.domainName.length > 0 && !state.error}
          />
        );
      case STEPS.OWNING_CONFIRMATION:
        return (
          <OwningConfirmation
            loading={state.loading}
            domainName={state.domainName}
            onConfirm={handleOwningConfirm}
            onCancel={() => setState({ ...state, step: STEPS.VERIFYING_DOMAIN })}
          />
        );
      case STEPS.PURCHASING_DOMAIN:
        return (
          <PurchasingDomain
            domainName={state.domainName}
            onConfirm={() => history.push(
              `/sites/${match.params.siteSlug}/settings/${SECTION_IDS.DOMAIN_MANAGEMENT}`,
            )}
          />
        );
      case STEPS.BUY_DOMAIN:
        /* eslint-disable no-console */
        return (
          <BuyDomain
            cost={state.price}
            period={state.period}
            loading={state.loading}
            renewCost={state.price}
            domain={state.rootDomain}
            onBuy={onBuyDomain}
            onCancel={() => setState({ ...state, step: STEPS.VERIFYING_DOMAIN })}
            onAddPaymentMethod={onAddPaymentMethod}
            paymentMethod={{
              cardNumber: get(paymentMethod, 'card.lastCardNumbers'),
              type: get(paymentMethod, 'type'),
            }}
          />
        );
      default: return null;
    }
  };

  return (
    <div id="test-add-custom-domain">
      <GoBackLink
        onClick={
          state.step !== STEPS.VERIFYING_DOMAIN
            ? () => setState({
              ...state,
              step: mapCurrentToPreviousStep[state.step],
            })
            : undefined
        }
      />
      <Box padding="37px 290px 48px 58px">
        <DomainName
          error={state.error}
          domainName={state.domainName}
          enableEdit={state.enableEdit}
          onChangeDomainName={onChangeDomainName}
        />
        {getCurrentStepComponent()}
      </Box>
    </div>
  );
};

AddCustomDomainForm.propTypes = {
  siteId: PropTypes.string.isRequired,
  siteSlug: PropTypes.string.isRequired,
};

export default AddCustomDomainForm;
