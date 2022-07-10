import { Avatar } from "antd";
import { IMember } from "interfaces";
import React, { useEffect, useState } from "react";
import { Wrapper } from './style';
import { LOGO_SMALL_URL } from "@constants";
import { T } from "i18n";

interface Props {
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
  setMember: (member: IMember) => void;
}

export const MemberCard: React.FC<Props> = ({ member, setOpenModal, setMember }) => {
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
      <section>
        <Avatar src={image} shape='circle' onError={() =>{ setImage(LOGO_SMALL_URL); return false}}/>
        <p>{name}</p>
      </section>
      <section>
        <p>{T.MEMBER_AGE(age)}</p>
      </section>
    </Wrapper>
  )
};