import axios from "axios";
import { HttpStatus, IMember } from "interfaces";
import { createEndpoints, RouteHandler } from "modules";
import cache from 'memory-cache';

const ENDPOINT = 'https://wwww.mediasmart.io';


const getMembers = async (page = 1, pageSize = 12): Promise<IMember[]> => {
  const members = await axios.get<IMember[]>(`http://work.mediasmart.io/?page_size=${pageSize}&page=${page}`, {
    headers: {
      'Authorization': 'mediasmart2019'
    }
  }).then(res => res.data);
  cache.put(page, members)
  return members;
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