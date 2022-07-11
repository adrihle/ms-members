import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';

import { MemberListContainer } from '@containers';
import axios from 'axios';
import { IMember } from 'interfaces';
import { PAGE_SIZE } from '@constants';

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
  return {
    props: {
      members: await axios.get<IMember[]>(`http://localhost:3000/api/members?page=${page}&pageSize=${PAGE_SIZE}`).then(res => res.data)
    }
  };
};

export default Home
