"use strict";

import axios, { AxiosResponse } from "axios";
import { HttpClient, HttpError, HttpGetParams, HttpPostBody, HttpResponse } from "@/core/http/HttpClient";
import { Nullable } from "@/types/app";

export class AxiosHttpClient implements HttpClient {
    async get<T>(url: string, params?: HttpGetParams): Promise<HttpResponse<T>> {
        let response = { data: null } as AxiosResponse;
        let error: Nullable<HttpError> = null;

        try {
            response = await axios.get<T>(url, { params });
        } catch (err) {
            error = err;
        }

        return AxiosHttpClient.handleResponse<T>(response, error);
    }

    async post<T>(url: string, body?: HttpPostBody): Promise<HttpResponse<T>> {
        let response = { data: null } as AxiosResponse;
        let error: Nullable<HttpError> = null;

        try {
            response = await axios.post<T>(url, body);
        } catch (err) {
            error = err;
        }

        return AxiosHttpClient.handleResponse<T>(response, error);
    }

    private static responseIsSuccessfull(response: AxiosResponse): boolean {
        return response.status.toString().charAt(0) === "2";
    }

    private static handleResponse<T>(response: AxiosResponse, error: any): HttpResponse<T> {
        if (error) {
            return [null, error];
        }

        if (AxiosHttpClient.responseIsSuccessfull(response)) {
            return [response.data, null];
        }

        return [null, response.data];
    }
}
