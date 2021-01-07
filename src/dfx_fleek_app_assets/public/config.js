const { REACT_APP_FE_NODE_ENV } = process.env;

const config = {
  production: {
    ethereum: {
      netId: 1,
      network: 'mainnet',
      ENSRegistryContractAddress: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
      ENSStorageContractAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    supportEmail: 'support@fleek.co',
    stripeKey: 'pk_live_5BfNUNll7l9PFbO0vNmTTSIi',
    auth: {
      clientId: 'terminal',
      baseURL: 'https://auth.fleek.co',
      // Note: The trailing slash is needed due to a bug in Safari
      // A similar issue can be found here https://github.com/IdentityModel/oidc-client-js/issues/238
      oidcRedirectUri: 'https://app.fleek.co/auth-cb/',
    },
    oldApi: {
      baseURL: 'https://terminal.co/graphql',
      wsBaseURL: 'wss://terminal.co/graphql',
    },
    newApi: {
      baseURL: 'https://b6756lokszgovfg2lkge3t4kai.appsync-api.us-west-2.amazonaws.com/graphql',
      wsBaseURL: 'wss://b6756lokszgovfg2lkge3t4kai.appsync-realtime-api.us-west-2.amazonaws.com/graphql',
    },
    intercomKey: 'k1pm16x3',
    storageIPFSGateway: 'storage.fleek.co',
    s3Client: {
      baseURL: 'https://storageapi.fleek.co/',
    },
    sentry: {
      org: 'fleek-uo',
      dsn: 'https://e7d85f83b6854092885b33074c5eab7d@o385630.ingest.sentry.io/5228504',

    },
    fullStory: {
      orgId: 'MXAGS',
    },
  },
  staging: {
    ethereum: {
      netId: 1,
      network: 'mainnet',
      ENSRegistryContractAddress: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
      ENSStorageContractAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    supportEmail: 'support@fleek.co',
    stripeKey: 'pk_live_5BfNUNll7l9PFbO0vNmTTSIi',
    auth: {
      clientId: 'terminal',
      baseURL: 'https://stg-auth.fleek.co',
      oidcRedirectUri: 'https://stg-app.fleek.co/auth-cb/',
    },
    oldApi: {
      baseURL: 'https://stg.terminal.co/graphql',
      wsBaseURL: 'wss://stg.terminal.co/graphql',
    },
    newApi: {
      baseURL: 'https://h6qbvxquqjg5direndhm7ugaj4.appsync-api.us-west-2.amazonaws.com/graphql',
      wsBaseURL: 'wss://h6qbvxquqjg5direndhm7ugaj4.appsync-realtime-api.us-west-2.amazonaws.com/graphql',
    },
    intercomKey: 'zyexc80g',
    storageIPFSGateway: 'storage-stg.fleek.co',
    s3Client: {
      baseURL: 'https://storageapi-stg.fleek.co/',
    },
    sentry: {
      org: 'fleek-uo',
      dsn: 'https://e7d85f83b6854092885b33074c5eab7d@o385630.ingest.sentry.io/5228504',

    },
    fullStory: {
      orgId: 'MXAGS',
    },
  },
  development: {
    ethereum: {
      netId: 3,
      network: 'ropsten',
      ENSRegistryContractAddress: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
      ENSStorageContractAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    supportEmail: 'support@fleek.co',
    stripeKey: 'pk_test_CJZoF6F9uT47IWH2gtdoxvOn',
    auth: {
      clientId: 'terminal',
      baseURL: 'https://dev-auth.fleek.co',

      // If doing local development, use the helper lambda for redirection
      oidcRedirectUri: 'https://hwpimci92a.execute-api.us-west-2.amazonaws.com/default/oidc-local-redirect-helper',
    },
    oldApi: {
      baseURL: 'https://dev.terminal.co/graphql',
      wsBaseURL: 'wss://dev.terminal.co/graphql',
    },
    newApi: {
      baseURL: 'https://7w65cjs2fnbwzdsltmxj427wfu.appsync-api.us-west-2.amazonaws.com/graphql',
      wsBaseURL: 'wss://7w65cjs2fnbwzdsltmxj427wfu.appsync-realtime-api.us-west-2.amazonaws.com/graphql',
    },
    intercomKey: 'zyexc80g',
    storageIPFSGateway: 'storage-dev.fleek.co',
    s3Client: {
      baseURL: 'https://storageapi-dev.fleek.co/',
    },
    sentry: {
      org: 'fleek-uo',
      dsn: 'https://e7d85f83b6854092885b33074c5eab7d@o385630.ingest.sentry.io/5228504',

    },
    fullStory: {
      orgId: 'MXAGS',
    },
  },
};

export default config[REACT_APP_FE_NODE_ENV] || config.development;
