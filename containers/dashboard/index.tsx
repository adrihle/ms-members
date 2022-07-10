import { useModal, usePagination } from "./hooks";
import { Pagination, Spin } from "antd";
import { IMember } from "interfaces";
import { MemberCard, MemberModal } from './components';

interface Props {
  members: IMember[];
}

export const DashboardContainer: React.FC<Props> = ({ members }) => {
  const { isLoading, page, navigate } = usePagination();
  const { isOpen, setMember, currentMember, setOpenModal } = useModal();

  return (
    <div>
      <Pagination current={page} onChange={navigate} pageSize={12} total={120} simple disabled={isLoading} />
      {isLoading && <Spin />}
      {!isLoading && members.map(member => <MemberCard key={member.id} {...{member, setOpenModal, setMember}} />)}
      {currentMember && <MemberModal {...{isOpen, member: currentMember, setOpenModal}}/>}
    </div>
  )
}