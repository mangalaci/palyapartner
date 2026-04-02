import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/profil', '/uzenetek', '/meccseim'],
    },
    sitemap: 'https://palyapartner.hu/sitemap.xml',
  }
}
