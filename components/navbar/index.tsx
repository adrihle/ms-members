import { Wrapper } from './style';
import Image from 'next/image';
import { LOGO_URL } from '@constants';

export const NavbarComponent: React.FC = () => {
  return (
    <Wrapper>
      <Image src={LOGO_URL} width={96} height={96} alt='logo' />
      <h3>Members</h3>
    </Wrapper>
  )
}