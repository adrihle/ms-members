import { MemberResume } from '@components';
import { useMembers } from '@hooks';
import { ResumeWrapper, Wrapper } from './style';

export const MemberViewContainer: React.FC = () => {
  const member = useMembers(state => state.currentMember)

  return (
    <Wrapper>
      <ResumeWrapper>
        {member && <MemberResume {...{member, showBio: true }}/>}
      </ResumeWrapper>
    </Wrapper>
  )
}