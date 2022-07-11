import { MemberViewContainer } from "@containers";
import { useMembers } from "@hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const MemberPage: NextPage = () => {
  const { query: {member: memberId }} = useRouter();
  const setCurrentMember = useMembers(state => state.setCurrentMember);

  useEffect(() => {
    setCurrentMember(String(memberId))
  }, [memberId, setCurrentMember]);

  return (
    <Wrapper>
      <MemberViewContainer />
    </Wrapper>
  )
}

export default MemberPage