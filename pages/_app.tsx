import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { NavbarComponent } from '@components';
import 'antd/dist/antd.css';

const Wrapper = styled.main``;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <NavbarComponent />
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp
