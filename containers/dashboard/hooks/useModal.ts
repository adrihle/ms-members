import { IMember } from "interfaces";
import { useState } from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<IMember>();

  const setOpenModal = (open: boolean) => {
    setIsOpen(open);
  };

  const setMember = (member: IMember) => {
    setCurrentMember(member);
  };

  return {
    isOpen,
    currentMember,
    setOpenModal,
    setMember
  }
}