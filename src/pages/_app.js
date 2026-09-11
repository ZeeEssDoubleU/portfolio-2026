import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { StoreProvider } from '../store/useStore'
import ResetStyle from '../styles/reset'
import GlobalStyle from '../styles/global'
import { theme } from '../styles/theme'
import Layout from '../components/Layout'
const styleProps = new Set(['navVisible', 'menuExpanded', 'bgSvgUrl', 'modal'])
export default function App({ Component, pageProps, router }) {
  return <StyleSheetManager shouldForwardProp={(prop, target) => typeof target !== 'string' || !styleProps.has(prop)}>
    <ThemeProvider theme={theme}><StoreProvider>
      <ResetStyle /><GlobalStyle />
      <Layout location={{ pathname: router.asPath }}><Component {...pageProps} /></Layout>
    </StoreProvider></ThemeProvider>
  </StyleSheetManager>
}
