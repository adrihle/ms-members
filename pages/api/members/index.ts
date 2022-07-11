import { HttpStatus, IMember } from "interfaces";
import { createEndpoints, RouteError, RouteHandler } from "modules";
import cache from 'memory-cache';
import { formatMembers, getMilisecondsToRevalidateCache } from "helpers";
import { EndpointService } from "services";

const getMembers = async (page = 1): Promise<IMember[]> => {
  const cachedMembers = cache.get(page);
  if (cachedMembers) return formatMembers(cachedMembers);

  const secondsToRevalidate = getMilisecondsToRevalidateCache();

  console.log({ secondsToRevalidate })

  const members = await EndpointService.getMembers(page);

  cache.put(page, members, secondsToRevalidate);
  
  if (!members) throw new RouteError(HttpStatus.NOT_FOUND, 'Members not found');

  return formatMembers(members);
};

const get: RouteHandler<IMember[]> = async ({ query: { page } }) => {
  const pageInt = Number(page);
  return {
    status: HttpStatus.OK,
    body: await getMembers(pageInt)
  }
}

export default createEndpoints({ get });