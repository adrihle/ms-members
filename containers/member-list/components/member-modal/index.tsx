import { MemberResume } from "@components";
import { Modal } from "antd";
import { T } from "i18n";
import { IMember } from "interfaces";
import { Wrapper } from "./style"

interface Props {
  isOpen: boolean;
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
}

export const MemberModal: React.FC<Props> = ({ isOpen = false, member, setOpenModal }) => {
  return (
    <Modal visible={isOpen} onCancel={() => setOpenModal(false)} footer={null} >
      <MemberResume {...{member, isModal: true, showBio: true}}/>
    </Modal>
  )
}
