import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
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
  render() { return <Html lang="en"><Head><link rel="icon" href="/favicon.svg" /><link rel="manifest" href="/manifest.webmanifest" /></Head><body><Main /><NextScript /></body></Html> }
}
