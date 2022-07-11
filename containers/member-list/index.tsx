import { useModal, usePagination } from "./hooks";
import { Pagination, Spin } from "antd";
import { IMember } from "interfaces";
import { MemberCard, MemberModal } from './components';
import { Wrapper, CardWrapper } from './style';
import { useResponsive } from "@hooks";

interface Props {
  members: IMember[];
}

export const MemberListContainer: React.FC<Props> = ({ members }) => {
  const { isLoading, page, navigate } = usePagination();
  const { isOpen, setMember, currentMember, setOpenModal } = useModal();
  const { grid } = useResponsive();

  return (
    <>
      <Wrapper>
        <Pagination current={page} onChange={navigate} pageSize={12} total={120} simple disabled={isLoading} />
      </Wrapper>
      <Wrapper>
        {isLoading && <Spin />}
        {!isLoading && (
          <CardWrapper {...{grid}}>
            {members.map(member => <MemberCard key={member.id} {...{member, setOpenModal, setMember}} />)}
          </CardWrapper>
        )}
        {currentMember && <MemberModal {...{isOpen, member: currentMember, setOpenModal}}/>}
      </Wrapper>
    </>
  )
}