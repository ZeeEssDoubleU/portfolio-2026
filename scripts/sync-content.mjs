// Optional DatoCMS refresh. The checked-in snapshot keeps ordinary builds independent of CMS access.
import { writeFile } from 'node:fs/promises'
const token = process.env.DATO_API_TOKEN
if (!token) throw new Error('Set DATO_API_TOKEN to a read-only Content Delivery API token before syncing.')
const response = await fetch('https://graphql.datocms.com/', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `{ allProjects(first: 100, orderBy: order_DESC) { title description moreInfo features tech projectLink codeLink slug image { url width height } } }` }),
})
if (!response.ok) throw new Error(`DatoCMS returned HTTP ${response.status}`)
const { data, errors } = await response.json()
if (errors?.length) throw new Error('DatoCMS rejected the content query. Verify the Project model fields in the API explorer.')
if (!data?.allProjects?.length) throw new Error('No projects returned; leaving existing content intact.')
const projects = data.allProjects.map(project => ({
  ...project,
  features: typeof project.features === 'string' ? JSON.parse(project.features) : project.features,
  tech: typeof project.tech === 'string' ? JSON.parse(project.tech) : project.tech,
  image: { src: project.image.url, aspectRatio: project.image.width / project.image.height },
}))
for (const project of projects) {
  if (!/^[a-z0-9-]+$/.test(project.slug) || !Array.isArray(project.tech) || !Array.isArray(project.features)) throw new Error('Invalid project data; leaving existing content intact.')
}
await writeFile(new URL('../src/data/projects.json', import.meta.url), JSON.stringify(projects, null, 2) + '\n')
console.log(`Updated ${projects.length} projects. Review and commit the content changes before deploying.`)
