import axios from "axios";
import { config } from "../config";

export interface Response {
  success: boolean;
}

export const deletePassword = async (id: number): Promise<Response> => {
  const endpoint = `${config.apiUrl}/password/${id}`;

  const { data } = await axios.delete<Response>(endpoint);

  return data;
};