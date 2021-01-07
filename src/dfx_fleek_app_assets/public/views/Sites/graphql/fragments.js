import gql from 'graphql-tag';

const teamDetail = `
  team {
    id
    name
  }
`;

const getSiteDetailFields = (options = {}) => {
  const {
    hideTeam = false,
  } = options;
  const teamField = hideTeam ? '' : teamDetail;

  return `
    id
    name
    slug
    createdBy
    createdAt
    updatedAt
    description
    ${teamField}
    buildSettings {
      buildCommand
      baseDirectoryPath
      publishDirectoryPath
      dockerImage
      environmentVariables {
        name
        value
      }
    }
    deploySettings {
      autoPublishing
      prDeployPreviews
      repository {
        url
        type
        branch
      }
    }
    domains {
      type
      domain
      status
      siteId
      teamId
      primary
      domainId
      createdAt
      creatorId
      dnsLinkStatus
      stripeSessionId
      boughtWithTerminal
      sslInfo {
        type
        createdAt
        expiresAt
        error
      }
    }
    publishedDeploy {
      id
      startedAt
      completedAt
      status
      ipfsHash
      log
      published
      previewImage
      repository {
        url
        name
        owner
        branch
        commit
      }
    }
    latestDeploy {
      id
      startedAt
      completedAt
      status
      ipfsHash
      log
      published
      previewImage
      completedAt
      repository {
        url
        name
        owner
        branch
        commit
      }
    }
    ensDomain {
      domain
      contentHash
      ownerAddress
      registrantAddress
      network
      isFleekControlled
      verificationStatus
      updateStatus
      verificationError
      isResolverMigrated
    }
  `;
};

export const MIN_SITE_DETAIL = gql`
  fragment MinSiteDetail on Site {
    id
    slug
    name
    team {
      id
      name
    }
    domains {
      type
      status
      domain
    }
    latestDeploy {
      id
      status
      ipfsHash
      completedAt
      previewImage
      repository {
        url
      }
    }
    publishedDeploy {
      id
      status
      completedAt
    }
  }
`;

export const SITE_DETAIL = gql`
  fragment SiteDetail on Site {
    ${getSiteDetailFields()}
  }
`;

// subscription requires slightly different fields
// https://github.com/Terminal-Systems/app-backend/blob/develop/serverless/packages/sites-api/src/mutations/notifySiteSubscription.ts
export const SITE_DETAIL_SUBSCRIPTION = gql`
fragment SiteDetailSubscription on Site {
  ${getSiteDetailFields({ hideTeam: true })}
}
`;

export const DEPLOY_DETAIL = gql`
  fragment DeployDetail on Deploy {
    id
    startedAt
    completedAt
    status
    ipfsHash
    log
    published
    previewImage
    repository {
      url
      name
      owner
      branch
      commit
      message
    }
    gitEvent
    pullRequestUrl
  }
`;
