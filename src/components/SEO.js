import Head from 'next/head'
import { useRouter } from 'next/router'
const description = 'Zachary Williams is a web developer in New York City. Contact him here for front-end engineering help with React, Next.js and more.'
export default function SEO(props) {
  const { asPath } = useRouter()
  const title = `${props.title || 'Web Developer | New York City'} | Zachary Williams`
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://zswportfolio.netlify.app"
  const url = origin ? new URL(asPath.split(/[?#]/)[0], origin).href : undefined
  return <Head>
    <title>{title}</title>
    <meta name="description" content={props.description || description} />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#000000" />
    {props.keywords && <meta name="keywords" content={props.keywords.join(', ')} />}
    {url && <link rel="canonical" href={url} />}
    {url && <meta property="og:url" content={url} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={props.description || description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={props.description || description} />
  </Head>
}
