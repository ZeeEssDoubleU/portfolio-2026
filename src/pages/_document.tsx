import type { DocumentContext } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { scrollBootstrap, restoreInitialScroll } from '../utils/scrollRestoration'
import { initialRevealBootstrap } from '../utils/initialReveal'
export default class PortfolioDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const renderPage = ctx.renderPage
    try {
      ctx.renderPage = () => renderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) })
      const props = await Document.getInitialProps(ctx)
      return { ...props, styles: <>{props.styles}{sheet.getStyleElement()}</> }
    } finally { sheet.seal() }
  }
  render() { return <Html lang="en"><Head><script dangerouslySetInnerHTML={{ __html: initialRevealBootstrap }} /><script dangerouslySetInnerHTML={{ __html: scrollBootstrap }} /><link rel="preload" as="image" href="/assets/stripes.svg" /><link rel="icon" href="/favicon.svg" /><link rel="manifest" href="/manifest.webmanifest" /></Head><body><Main /><script dangerouslySetInnerHTML={{ __html: restoreInitialScroll }} /><NextScript /></body></Html> }
}
