import axios from "axios";
import { HttpStatus, IMember } from "interfaces";
import { createEndpoints, RouteError, RouteHandler } from "modules";
import cache from 'memory-cache';
import { formatMembers } from "helpers";
import { env } from "env";
import { EndpointService } from "services";

const ENDPOINT = env.endpoint;

const getMembers = async (page = 1): Promise<IMember[]> => {
  const members = await EndpointService.getMembers(page);
  
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
    body: getCachedMembers(pageInt) ?? await getMembers(pageInt)
  }
}

export default createEndpoints({ get });