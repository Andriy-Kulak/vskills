import { Entry } from '@/lib/types';

interface EntryJsonLdProps {
  entry: Entry;
}

export function EntryJsonLd({ entry }: EntryJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: entry.title,
    description: entry.prompt || `AI-generated video by @${entry.creator_handle}`,
    url: `https://vskills.dev/entry/${entry.id}`,
    datePublished: entry.date,
    author: {
      '@type': 'Person',
      name: entry.creator_name,
      identifier: entry.creator_handle,
      url: entry.source_url,
    },
    ...(entry.thumbnail_url && {
      thumbnailUrl: entry.thumbnail_url,
      image: entry.thumbnail_url,
    }),
    ...(entry.video_url && {
      video: {
        '@type': 'VideoObject',
        name: entry.title,
        thumbnailUrl: entry.thumbnail_url,
        contentUrl: entry.video_url,
        uploadDate: entry.date,
      },
    }),
    ...(entry.model && {
      tool: {
        '@type': 'SoftwareApplication',
        name: entry.model,
      },
    }),
    ...(entry.tags && entry.tags.length > 0 && {
      keywords: entry.tags.join(', '),
    }),
    ...(entry.metrics?.views && {
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/WatchAction',
        userInteractionCount: entry.metrics.views,
      },
    }),
    isAccessibleForFree: true,
    license: 'Content rights remain with the original creator',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
