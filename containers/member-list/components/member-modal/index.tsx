import { Modal } from "antd";
import { T } from "i18n";
import { IMember } from "interfaces";
import { CardHeader } from "../card-header";
import { Wrapper } from "./style"

interface Props {
  isOpen: boolean;
  member: IMember;
  setOpenModal: (isOpen: boolean) => void;
}

export const MemberModal: React.FC<Props> = ({ isOpen = false, member, setOpenModal }) => {
  return (
    <Modal visible={isOpen} onCancel={() => setOpenModal(false)} footer={null} >
      <MemberResume {...{member}}/>
    </Modal>
  )
}

export const MemberResume: React.FC<Pick<Props, 'member'>> = ({ member }) => {
  const { bio } = member;
  return (
    <Wrapper>
    <CardHeader {...{member, isModal: true}}/>
    <div>
      {T.BIO}: 
      <p>{bio}</p>
    </div>
  </Wrapper>
  )
}