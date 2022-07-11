import { useModal, usePagination } from "./hooks";
import { Empty, Pagination, Spin } from "antd";
import { IMember } from "interfaces";
import { MemberCard, MemberModal } from './components';
import { Wrapper, CardWrapper } from './style';
import { useResponsive } from "@hooks";
import { PAGE_SIZE } from "@constants";

interface Props {
  members: IMember[];
};

export const MemberListContainer: React.FC<Props> = ({ members }) => {
  const { isLoading, page, navigate } = usePagination();
  const { isOpen, setMember, currentMember, setOpenModal } = useModal();
  const { grid } = useResponsive();

  const isEmpty = !isLoading && !members;

  const getTotal = (page: number) => page*PAGE_SIZE + 1;

  return (
    <>
      <Wrapper>
        <Pagination current={page} onChange={navigate} pageSize={PAGE_SIZE} total={getTotal(page)} simple disabled={isLoading} />
      </Wrapper>
      <Wrapper {...{isLoading}}>
        {isLoading && <Spin size="large"/>}
        {!isLoading && (
          <CardWrapper {...{grid}}>
            {members.map(member => <MemberCard key={member.id} {...{member, setOpenModal, setMember}} />)}
          </CardWrapper>
        )}
        {isEmpty && <Empty />}
        {currentMember && <MemberModal {...{isOpen, member: currentMember, setOpenModal}}/>}
      </Wrapper>
    </>
  )
}