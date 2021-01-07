import React from 'react';

import SummaryList from './SummaryList';

export default { title: 'Summarylist' };

export const SummaryListComponent = () => {
  const items = [
    {
      title: 'All files already uploaded',
      subtitle: `All files
        already uploaded by a previous deploy with the same commits.`,
      icon: ['fal', 'info-circle'],
    },
    {
      title: 'No redirect rules processed',
      subtitle: `This deploy
        did not include any redirect rules. Learn more about redirects.`,
      icon: ['fal', 'info-circle'],
    },
    {
      title: 'No header rules processed',
      subtitle: `This deploy
        did not include any header rules. Learn more about headers.`,
      icon: ['fal', 'info-circle'],
    },
    {
      title: 'All linked resources are secure',
      subtitle: `Congratulations!
        No insecure mixed content found in your files.`,
      icon: ['fal', 'info-circle'],
    },
    {
      title: 'Build time: 1m 3s. Total deploy time: 1m 3s',
      subtitle: `Build started at 3:53:42PM and ended at 3:54:45PM.
      Learn more about build minutes.`,
      icon: ['fal', 'info-circle'],
    },
  ];
  const title = 'Deploy Summary';

  return (
    <div style={{ width: 965 }}>
      <SummaryList items={items} title={title} />
    </div>
  );
};
