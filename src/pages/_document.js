import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { scrollBootstrap, restoreInitialScroll } from '../utils/scrollRestoration'
export default class PortfolioDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const renderPage = ctx.renderPage
    try {
      ctx.renderPage = () => renderPage({ enhanceApp: App => props => sheet.collectStyles(<App {...props} />) })
      const props = await Document.getInitialProps(ctx)
      return { ...props, styles: <>{props.styles}{sheet.getStyleElement()}</> }
    } finally { sheet.seal() }
  }
  render() { return <Html lang="en"><Head><script dangerouslySetInnerHTML={{ __html: scrollBootstrap }} /><link rel="icon" href="/favicon.svg" /><link rel="manifest" href="/manifest.webmanifest" /></Head><body><Main /><script dangerouslySetInnerHTML={{ __html: restoreInitialScroll }} /><NextScript /></body></Html> }
}
