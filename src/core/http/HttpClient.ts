import axios, { AxiosResponse } from "axios";

type HttpResponse = AxiosResponse;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = any;

export default class HttpClient {
  async get(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
  ): Promise<HttpResponse> {
    return axios.get(url, { params });
  }

  async post(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any>
  ): Promise<HttpResponse> {
    return axios.post(url, body);
  }
}
