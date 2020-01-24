"use strict";

import { Nullable } from "@/types/app";

export interface HttpError {
    message: string;
}

export type HttpResponse<R> = [Nullable<R>, Nullable<HttpError>];

export type HttpGetParams = Record<
    string,
    boolean | Array<boolean | string | number> | string | number
>;

export type HttpPostBody = Record<string, any>;

export interface HttpClient {
    get<R>(url: string, params?: HttpGetParams): Promise<HttpResponse<R>>;
    post<R>(url: string, body?: HttpPostBody): Promise<HttpResponse<R>>;
}
