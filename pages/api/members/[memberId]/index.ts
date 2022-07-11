import { HttpStatus, IMember } from "interfaces";
import { createEndpoints, RouteHandler } from "modules";
import cache from 'memory-cache';

const getMemberCachedById = (id: string, page: number) => {
  const membersCached = cache.get(page) as IMember[];

  return membersCached.find(({ id }) => id)
}

const get: RouteHandler<IMember> = async ({ query }) => {
  const { member, page } = query;
  console.log('DESDE APIIIII')
  return {
    status: HttpStatus.OK,
    body: getMemberCachedById(String(member), Number(page))
  }
};

export default createEndpoints({ get });