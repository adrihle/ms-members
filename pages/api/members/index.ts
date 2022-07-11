import axios from "axios";
import { HttpStatus, IMember } from "interfaces";
import { createEndpoints, RouteError, RouteHandler } from "modules";
import cache from 'memory-cache';
import { formatMembers } from "helpers";
import { env } from "env";

const ENDPOINT = env.endpoint;

const getMembers = async (page = 1, pageSize = 12): Promise<IMember[]> => {
  const members = await axios.get<IMember[]>(`${ENDPOINT}/?page_size=${pageSize}&page=${page}`, {
    headers: {
      'Authorization': 'mediasmart2019'
    }
  })
  .then(res => res.data)
  .catch(err => console.error(err));
  
  if (!members) throw new RouteError(HttpStatus.NOT_FOUND, 'Members not found');

  const formatedMembers = formatMembers(members);
  cache.put(page, formatedMembers);
  return formatedMembers;
};

const getCachedMembers = (page: number): IMember[] => {
  return cache.get(page);
};

const get: RouteHandler<IMember[]> = async ({ query }) => {
  const {page, pageSize} = query;
  const pageInt = Number(page);
  const pageSizeInt = Number(pageSize);
  return {
    status: HttpStatus.OK,
    body: getCachedMembers(pageInt) ?? await getMembers(pageInt, pageSizeInt)
  }
}

export default createEndpoints({ get });