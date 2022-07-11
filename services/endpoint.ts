import { PAGE_SIZE } from "@constants";
import axios from "axios";
import { env } from "env";
import { IMember } from "interfaces";
import { fetcher } from "modules";

const ENDPOINT_URL = env.endpoint;
const TOKEN = process.env.TOKEN ?? '';

export const EndpointService = {
  getMembers: async (page: any) => {
    return axios.get<IMember[]>(`${ENDPOINT_URL}/?page_size=${PAGE_SIZE}&page=${page}`, {
      headers: {
        'Authorization': TOKEN
      }
    })
    .then(res => res.data)
    .catch(err => console.error(err))
  }
}