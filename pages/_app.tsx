import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { NavbarComponent } from '@components';
import 'antd/dist/antd.css';
import { defaultTheme, GlobalWrapper } from '@styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalWrapper>
        <NavbarComponent />
        <Component {...pageProps} />
      </GlobalWrapper>
    </ThemeProvider>
  )
}

export default MyApp
