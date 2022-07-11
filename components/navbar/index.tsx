import { Wrapper } from './style';
import Image from 'next/image';
import { EBreakpoints, LOGO_URL } from '@constants';
import { T } from 'i18n';
import { useResponsive } from '@hooks';

export const NavbarComponent: React.FC = () => {
  const { logoSize, resolution } = useResponsive();

  const isMobile = resolution === EBreakpoints.MOBILE;

  return (
    <Wrapper>
      <Image src={LOGO_URL} width={logoSize} height={100} alt='logo' />
      {!isMobile && <div><h3>{T.NAVBAR_TITLE}</h3></div>}
    </Wrapper>
  )
}