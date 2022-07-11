import { Avatar, Badge, Tag } from "antd";
import { IMember } from "interfaces";
import React, { useEffect, useState } from "react";
import { HeaderWrapper, TagWrapper, Wrapper } from './style';
import { LOGO_SMALL_URL } from "@constants";
import { T } from "i18n";
import { useResponsive } from "@hooks";
import { useTheme } from "styled-components";

interface Props {
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
  setMember: (member: IMember) => void;
}

export const MemberCard: React.FC<Props> = ({ member, setOpenModal, setMember }) => {
  const { imageSize } = useResponsive();
  const { colors } = useTheme();
  const { name, age } = member;
  const [image, setImage] = useState<string>(LOGO_SMALL_URL);
  
  const handleOpenModal = () => {
    setMember(member);
    setOpenModal(true);
  };

  useEffect(() => {
    setImage(member.image);
  }, [member]);

  return (
    <Wrapper onClick={handleOpenModal}>
      <HeaderWrapper>
        <Avatar 
          src={image} 
          shape='circle' 
          onError={() =>{ setImage(LOGO_SMALL_URL); return false}}
          size={imageSize}
        />
        <p>{name}</p>
      </HeaderWrapper>
      <TagWrapper>
        <Tag color={colors.PRIMARY}>{T.MEMBER_AGE(age)}</Tag>
      </TagWrapper>
    </Wrapper>
  )
};