const BASE_URL = 'https://copyright-act-bd.example.com'; // Replace with actual production domain

export default async function sitemap() {
  const routes = [
    '',
    '/law',
    '/topics',
    '/guide',
    '/search',
    '/glossary',
    '/faq'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
