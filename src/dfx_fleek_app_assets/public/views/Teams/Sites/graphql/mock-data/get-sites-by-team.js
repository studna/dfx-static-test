const GET_SITES_QUERY_MOCK_DATA = {
  getSitesByTeam: {
    nextToken: '',
    sites: [
      {
        cursor: '1',
        node: {
          id: '1',
          teamId: 't1',
          name: 'my site1',
          slug: 'my-site1',
          createdBy: '12345',
          latestDeploy: {
            id: 'd1',
            ipfsHash: 'QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D',
            previewImage: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
            published: true,
            completedAt: '1579030220000',
            repository: {
              url: 'https://github.com/Terminal-Systems',
            },
          },
        },
      },
    ],
  },
};

export default GET_SITES_QUERY_MOCK_DATA;
