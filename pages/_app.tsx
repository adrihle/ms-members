import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { NavbarComponent } from '@components';
import 'antd/dist/antd.css';
import { defaultTheme } from '@styles';

const Wrapper = styled.main``;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <NavbarComponent />
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  )
}

export default MyApp
