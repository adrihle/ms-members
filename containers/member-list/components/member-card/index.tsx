import { Tag } from "antd";
import { IMember } from "interfaces";
import { TagWrapper, Wrapper } from './style';
import { T } from "i18n";
import { useTheme } from "styled-components";
import { MemberResume } from "@components";

interface Props {
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
  setMember: (member: IMember) => void;
}

export const MemberCard: React.FC<Props> = ({ member, setOpenModal, setMember }) => {
  const { colors } = useTheme();
  const { age, ...rest } = member;
  
  const handleOpenModal = () => {
    setMember(member);
    setOpenModal(true);
  };

  return (
    <Wrapper onClick={handleOpenModal}>
      <MemberResume {...{ member: rest, showBio: false }}/>
      <TagWrapper>
        <Tag color={colors.PRIMARY}>{T.MEMBER_AGE(age)}</Tag>
      </TagWrapper>
    </Wrapper>
  )
};