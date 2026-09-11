import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
const projects = JSON.parse(await readFile(new URL('../src/data/projects.json', import.meta.url)))
const read = path => readFile(new URL(`../out/${path}`, import.meta.url), 'utf8')
test('all original project URLs export with content and safe close navigation', async () => {
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length)
  for (const project of projects) {
    const html = await read(`project/${project.slug}/index.html`)
    assert.ok(html.includes(project.title), `Missing title: ${project.slug}`)
    assert.match(html, /href="\/#projects"/)
    assert.ok(html.includes(project.codeLink.replaceAll('&', '&amp;')), `Missing repository: ${project.slug}`)
    assert.match(html, /data-styled=/)
    if (project.image.src.startsWith('/')) await access(new URL(`../out${project.image.src}`, import.meta.url))
  }
})
test('Netlify contact form is in static HTML with spam protection and a success destination', async () => {
  const html = await read('index.html')
  assert.match(html, /name="contact-form"/)
  assert.match(html, /data-netlify="true"/)
  assert.match(html, /data-netlify-honeypot="honeypot-field"/)
  assert.match(html, /action="\/thanks\/"/)
  for (const name of ['form-name', 'honeypot-field', 'name', 'email', 'subject', 'message']) assert.ok(html.includes(`name="${name}"`))
  assert.match(await read('thanks/index.html'), /Your message has been sent/)
})
test('static export includes branding, a 404 and no Gatsby runtime', async () => {
  const html = await read('index.html')
  assert.match(html, /<title[^>]*>Web Developer/)
  assert.doesNotMatch(html, /___gatsby|gatsby-(?:image|script|focus)/)
  for (const asset of ['favicon.svg', 'manifest.webmanifest', 'assets/selfie-tinted.png', 'assets/stripes.svg', '404.html']) await access(new URL(`../out/${asset}`, import.meta.url))
})
