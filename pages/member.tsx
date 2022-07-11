import { MemberListContainer } from "@containers";
import { IMember } from "interfaces";
import { NextPage, GetServerSideProps } from "next";
import { MemberService } from "services";
import styled from "styled-components";

interface Props {
  members: IMember[];
}

const Wrapper = styled.div``;

const MemberPage: NextPage<Props> = ({ members }) => {
  return (
    <Wrapper>
      <MemberListContainer {...{members}}/>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { page } }) => {
  const response = await MemberService.getMembers(page);
  return {
    props: {
      members: response.data ?? []
    }
  };
};

export default MemberPage