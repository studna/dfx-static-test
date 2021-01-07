/* eslint-disable import/prefer-default-export */
const PENDING_PROPAGATION = 'PENDING_PROPAGATION';

export const getPurchasedDomainPendings = (domains = []) => {
  const purchasedDomainsPending = domains.filter((domain) => (
    domain.boughtWithTerminal && domain.status === PENDING_PROPAGATION
  ));

  return purchasedDomainsPending;
};
