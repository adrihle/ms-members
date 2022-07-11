import { PAGE_SIZE } from "@constants";
import { IMember } from "interfaces";
import { HttpService } from "modules";

const BASE_URL = '/members';

export class MembersHttp extends HttpService {
  constructor (){
    super(BASE_URL)
  }

  async getMembers (page: any) {
    return this.http.get<IMember[]>(`/?page=${page}&pageSize=${PAGE_SIZE}`);
  };

  async getMember (id: any, page: any) {
    console.log({ id, page })
    return this.http.get<IMember>(`/${id}/?page=${page}`);
  }
};

export const MemberService = new MembersHttp();