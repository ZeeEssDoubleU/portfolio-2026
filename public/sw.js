// Retire the previous Gatsby offline worker when the 2026 site takes over this
// origin. This file is never registered by the Next.js application itself.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await self.clients.claim()
    const names = await caches.keys()
    await Promise.all(names.filter(name => /workbox|gatsby/i.test(name)).map(name => caches.delete(name)))
    await self.registration.unregister()
    const windows = await self.clients.matchAll({ type: 'window' })
    await Promise.all(windows.map(client => client.navigate(client.url)))
  })())
})
