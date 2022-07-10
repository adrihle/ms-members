import { IMember } from "interfaces";
import { HttpBase } from "modules";

const BASE_URL = 'members';

export class MembersHttp extends HttpBase {
  constructor (){
    super(BASE_URL)
  }

  async getMembers (page: number, pageSize: number) {
    console.log({ page })
    return this.http.get<IMember[]>(BASE_URL)
  }
};

export const MemberService = new MembersHttp();