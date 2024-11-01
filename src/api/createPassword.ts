import axios from "axios";
import { config } from "../config";
import { BaseOption, Validation } from "../types/options";

export interface Response {
  success: boolean;
  validation?: Validation;
}

export const createPassword = async (values: BaseOption): Promise<Response> => {
  const endpoint = `${config.apiUrl}/password`;

  const formData = new FormData();

  formData.append('name', values.name);
  formData.append('password', values.password);
  formData.append('content', values.content);

  try {
    const { data } = await axios.post<Response>(endpoint, formData);

    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data;
    }
  }

  return {
    success: false,
  }
};