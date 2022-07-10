import { Modal } from "antd";
import { IMember } from "interfaces";
import { Wrapper } from "./style"

interface Props {
  isOpen: boolean;
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
}

export const MemberModal: React.FC<Props> = ({ isOpen = false, member, setOpenModal }) => {
  return (
    <Wrapper>
      <Modal title={'testing modal'} visible={isOpen} onCancel={() => setOpenModal(false)} footer={null} >
        <div>{member.name}</div>
      </Modal>
    </Wrapper>
  )
}