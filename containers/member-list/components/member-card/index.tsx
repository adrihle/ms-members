import { Tag } from "antd";
import { IMember } from "interfaces";
import { TagWrapper, Wrapper, ModalWrapper } from './style';
import { T } from "i18n";
import { useTheme } from "styled-components";
import { MemberResume } from "@components";
import { ProfileOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface Props {
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
  setMember: (member: IMember) => void;
}

export const MemberCard: React.FC<Props> = ({ member, setOpenModal, setMember }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { age, ...rest } = member;
  
  const handleOpenModal = () => {
    setMember(member);
    setOpenModal(true);
  };

  const handleRedirect = () => {
    router.push(`member?member=${member.id}`)
  }

  return (
    <Wrapper>
      <ModalWrapper onClick={handleOpenModal}>
        <MemberResume {...{ member: rest, showBio: false }} />
      </ModalWrapper>
      <TagWrapper>
        <Tag color={colors.PRIMARY}>{T.MEMBER_AGE(age)}</Tag>
        <ProfileOutlined onClick={handleRedirect}/>
      </TagWrapper>
    </Wrapper>
  )
};