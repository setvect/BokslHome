<svelte:options runes={true} />

<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';

  let { path = '', description = '', title = '', subtitle = '' } = $props();

  let imgsrc = `https://open-graph-vercel.vercel.app/api/flowbite-svelte-admin-dashboard?title=${subtitle}`;

  let og_url: string = `https://flowbite-svelte-admin-dashboard.vercel.app${path}`;
</script>

<MetaTags
  {title}
  {description}
  openGraph={{
    type: 'website',
    url: `${og_url}`,
    title: `${title}`,
    description: `${description}`,
    images: [
      {
        url: imgsrc,
        width: 1200,
        height: 630,
        alt: `${title}`
      }
    ],
    siteName: 'Flowbite Svelte Admin Dashboard'
  }}
  twitter={{
    site: '@shinokada',
    cardType: 'summary_large_image',
    title: `${title}`,
    description: `${description}`,
    image: imgsrc,
    imageAlt: `${title}`
  }}
/>
