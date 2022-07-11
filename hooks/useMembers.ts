import { IMember } from "interfaces";
import create, { SetState, GetState, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IState {
  members: IMember[];
  currentMember?: IMember;
  setCurrentMember: (memberId: string) => void;
  setMembers: (members: IMember[]) => void;
  getMemberById: (id: string) => IMember | undefined;
}

type ISet = SetState<IState>;
type IGet = GetState<IState>;

const state: StateCreator<IState> = (set, get) => ({
  members: [],
  setCurrentMember: (memberId: string) => setCurrentMember(set, get, memberId),
  setMembers: (members: IMember[]) => setMembers(set, members),
  getMemberById: (id: string) => getMemberById(get, set, id)
});

const setCurrentMember = (set: ISet, get: IGet, userId: string) => {
  const { members } = get();
  const currentMember = members.find(({id}) => id === userId);
  set(() => ({ currentMember }))
};

const setMembers = (set: ISet, members: IMember[]) => {
  set(() => ({ members }))
};

const getMemberById = (get: IGet, set: ISet, userId: string) => {
  const { members } = get();
  return members.find(({id}) => id === userId);
}

export const useMembers = create(devtools(state, { name: 'Members state' }));

