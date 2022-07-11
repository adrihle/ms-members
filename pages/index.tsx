import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { MemberListContainer } from '@containers';
import { IMember } from 'interfaces';
import { MemberService } from 'services';

const Wrapper = styled.div``;

interface Props {
  members: IMember[];
}

const Home: NextPage<Props> = ({ members }) => {
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

export default Home
