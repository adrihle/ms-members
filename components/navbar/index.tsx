import { Wrapper } from './style';
import Image from 'next/image';
import { EBreakpoints, LOGO_URL } from '@constants';
import { T } from 'i18n';
import { useResponsive } from '@hooks';
import { useRouter } from 'next/router';

export const NavbarComponent: React.FC = () => {
  const { logoSize, resolution } = useResponsive();
  const router = useRouter();

  const isMobile = resolution === EBreakpoints.MOBILE;

  const redirect = () => {
    router.push('/')
  }

  return (
    <Wrapper>
      <Image src={LOGO_URL} width={logoSize} height={100} alt='logo' onClick={redirect}/>
      {!isMobile && <div><h3>{T.NAVBAR_TITLE}</h3></div>}
    </Wrapper>
  )
}