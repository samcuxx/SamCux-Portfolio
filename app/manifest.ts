import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SamCux Portfolio',
    short_name: 'SamCux',
    description: 'Portfolio of SamCux - Software Engineer & Content Creator',
    start_url: '/',
    display: 'standalone',
    background_color: '#131C31',
    theme_color: '#ffe400',
    icons: [
      {
        src: '/icons/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: "/screenshots/Desktop.png",
        sizes: "1237x662",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "/screenshots/Mobile.png",
        sizes: "311x672",
        type: "image/png",
        form_factor: "narrow"
      }
    ],
    id: '/',
    orientation: 'any',
    categories: ['portfolio', 'development', 'design']
  };
} 