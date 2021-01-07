import React, { useState } from 'react';
import get from 'lodash/get';
import Box from '@terminal-packages/ui/core/Box';
import { newApiClient } from '@Clients';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_SITE_BY_SLUG } from '../../../graphql/queries';
import AddEnsDescription from '../../components/AddEnsDescription';
import EnsDomainField from '../../components/EnsDomainField';
import VerifyButtons from '../../components/VerifyButtons';
import AlreadyHasOwner from '../../components/AlreadyHasOwner';
import AddEnsButtons from '../../components/AddEnsButtons';
import BuyDomain from '../../components/BuyDomain';

import { STEPS } from './constants';

const AddEnsDomainForm = () => {
  const [state, setState] = useState({
    domain: '',
    loading: false,
    step: STEPS.VERIFY,
    ensDomainInfo: null,
  });

  const match = useRouteMatch();

  const { data } = useQuery(GET_SITE_BY_SLUG, {
    client: newApiClient,
    variables: {
      slug: match.params.siteSlug,
    },
    fetchPolicy: 'cache-and-network',
  });

  const siteId = get(data, 'getSiteBySlug.id', '');

  const formByStep = {
    [STEPS.VERIFY]: (
      <>
        <EnsDomainField state={state} setState={setState} />
        <VerifyButtons state={state} setState={setState} />
      </>
    ),
    [STEPS.ALREADY_HAS_OWNER]: (
      <>
        <EnsDomainField state={state} setState={setState} />
        <AlreadyHasOwner state={state} />
        <AddEnsButtons
          state={state}
          setState={setState}
          siteId={siteId}
        />
      </>
    ),
    [STEPS.BUY_A_DOMAIN]: (
      <>
        <EnsDomainField state={state} setState={setState} />
        <BuyDomain
          state={state}
          setState={setState}
        />
        <AddEnsButtons
          state={state}
          setState={setState}
          siteId={siteId}
        />
      </>
    ),
  };

  return (
    <Box padding="37px 290px 48px 58px">
      <AddEnsDescription />
      {formByStep[state.step] || null}
    </Box>
  );
};

export default AddEnsDomainForm;
