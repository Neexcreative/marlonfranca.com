// Builds /llms.txt and /llms-full.txt (https://llmstxt.org) from the site data,
// so AI assistants get a clean, current summary of who Marlon is and the work.
import { site, profiles, disciplines } from '@/data/site'
import { projects } from '@/data/projects'

const header = () =>
  [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a ${site.jobTitle.toLowerCase()} based in ${site.location}, available for freelance and studio projects worldwide.`,
    '',
    `- Website: ${site.url}`,
    `- Email: ${site.email}`,
    `- Location: ${site.location}`,
    ...profiles.map((p) => `- Profile: ${p}`),
    '',
    '## Services',
    '',
    ...disciplines.map((d) => `- ${d}`),
    '',
  ].join('\n')

export const llmsTxt = () =>
  [
    header(),
    '## Pages',
    '',
    `- [Selected work](${site.url}/#work): portfolio of ${projects.length} projects across all services`,
    `- [About & contact](${site.url}/about): background, services, experience and how to get in touch`,
    `- [Full details](${site.url}/llms-full.txt): every project with client, year, services and description`,
    '',
    '## Projects',
    '',
    ...projects.map((p) => `- ${p.title} (${p.category}, ${p.year}): ${p.summary}`),
    '',
  ].join('\n')

export const llmsFullTxt = () =>
  [
    header(),
    '## Projects',
    '',
    ...projects.flatMap((p) => [
      `### ${p.title}`,
      '',
      `- Client: ${p.client}`,
      `- Year: ${p.year}`,
      `- Service: ${p.category}`,
      `- Scope: ${p.services.join(', ')}`,
      '',
      p.summary,
      '',
      ...p.description.flatMap((d) => [d, '']),
    ]),
    '## Contact',
    '',
    `For new projects or collaborations, email ${site.email}.`,
    '',
  ].join('\n')

export const textResponse = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
