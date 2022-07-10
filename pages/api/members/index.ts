import axios from "axios";
import { HttpStatus, IMember } from "interfaces";
import { createEndpoints, RouteError, RouteHandler } from "modules";
import cache from 'memory-cache';
import { LOGO_SMALL_URL } from "@constants";
import { T } from "i18n";

const ENDPOINT = 'http://work.mediasmart.io';

const formatImage = (url: string) => {
  const isNumberType = typeof url === 'number';
  return isNumberType ? LOGO_SMALL_URL : url.replace('/assets', '');
};

const formatName = (imageUrl: string) => {
  if (imageUrl === LOGO_SMALL_URL) return T.DEFAULT_NAME;
  const urlArr = imageUrl.split('/');
  const nameFromUrl = urlArr[urlArr.length - 1];
  const nameArr = nameFromUrl.split('.');
  return `${capitalizeWord(nameArr[0])} ${capitalizeWord(nameArr[1])}`;
};

const capitalizeWord = (word: string): string => {
  const firstLetter = word.charAt(0).toUpperCase();
  const remain = word.slice(1);
  return firstLetter + remain;
}

const formatMembers = async (members: IMember[]): Promise<IMember[]> => {
  const fromatedMembers: IMember[] = [];
  for (const { image, name, ...rest } of members){
    const formatedImage = formatImage(image);
    fromatedMembers.push({
      ...rest,
      image: formatedImage,
      name: formatName(formatedImage)
    })
  }
  return fromatedMembers;
};

const getMembers = async (page = 1, pageSize = 12): Promise<IMember[]> => {
  const members = await axios.get<IMember[]>(`${ENDPOINT}/?page_size=${pageSize}&page=${page}`, {
    headers: {
      'Authorization': 'mediasmart2019'
    }
  })
  .then(res => res.data)
  .catch(err => console.error(err));
  
  if (!members) throw new RouteError(HttpStatus.NOT_FOUND, 'Members not found');

  const formatedMembers = await formatMembers(members);
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