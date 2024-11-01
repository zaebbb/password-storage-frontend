import axios from "axios";
import { config } from "../config";
import { Options } from "../types/options";

export interface Response {
  success: boolean;
  items: Options;
}

export const allPasswords = async (): Promise<Response> => {
  const endpoint = `${config.apiUrl}/password`;

  const { data } = await axios.get<Response>(endpoint);

  return data;
};