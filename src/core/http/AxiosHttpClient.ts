"use strict";

import axios, { AxiosResponse } from "axios";
import { HttpClient, HttpResponse } from "@/core/http/HttpClient";

export class AxiosHttpClient implements HttpClient {
    async get<T>(url: string): Promise<HttpResponse<T>> {
        const response: AxiosResponse = await axios.get<T>(url);

        return [response.data, null];
    }

    async post<T>(url: string): Promise<HttpResponse<T>> {
        const response: AxiosResponse = await axios.post<T>(url);

        return [response.data, null];
    }

    async put<T>(url: string): Promise<HttpResponse<T>> {
        const response: AxiosResponse = await axios.put<T>(url);

        return [response.data, null];
    }

    async delete<T>(url: string): Promise<HttpResponse<T>> {
        const response: AxiosResponse = await axios.delete<T>(url);

        return [response.data, null];
    }
}
