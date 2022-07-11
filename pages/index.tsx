import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { MemberListContainer } from '@containers';
import { IMember } from 'interfaces';
import { MemberService } from 'services';
import { useMembers } from '@hooks';
import { useEffect } from 'react';

const Wrapper = styled.div``;

interface Props {
  members: IMember[];
}

const Home: NextPage<Props> = ({ members }) => {
  const setMembers = useMembers(state => state.setMembers);
  useEffect(() => {
    setMembers(members)
  }, [members, setMembers]);
  return (
    <Wrapper>
      <MemberListContainer {...{members}}/>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { page } }) => {
  if (!page) return {
    redirect: {
      destination: '/?page=1'
    },
    props: {
      members: []
    }
  }
  const response = await MemberService.getMembers(page);
  return {
    props: {
      members: response.data ?? []
    }
  };
};

export default Home
