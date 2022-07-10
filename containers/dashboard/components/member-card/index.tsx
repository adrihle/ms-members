import { IMember } from "interfaces";
import React from "react";
import { Wrapper } from './style';

interface Props {
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
  setMember: (member: IMember) => void;
}

export const MemberCard: React.FC<Props> = ({ member, setOpenModal, setMember }) => {
  const { name } = member;
  
  const handleOpenModal = () => {
    setMember(member);
    setOpenModal(true);
  };

  return (
    <Wrapper onClick={handleOpenModal}>
      {name}
    </Wrapper>
  )
}