import { Wrapper } from './style';
import Image from 'next/image';
import { LOGO } from '@constants';

export const NavbarComponent: React.FC = () => {
  return (
    <Wrapper>
      <Image src={LOGO} width={96} height={96} alt='logo' />
      <h3>Members</h3>
    </Wrapper>
  )
}