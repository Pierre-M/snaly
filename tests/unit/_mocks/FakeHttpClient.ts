"use strict";

import { HttpClient, HttpResponse } from "@/core/http/HttpClient";
import { singleton } from "tsyringe";

@singleton()
export class FakeHttpClient implements HttpClient {
    private response: HttpResponse<any> = [null, null];

    get = jest.fn(this.responseHandler);
    post = jest.fn(this.responseHandler);

    responseHandler() {
        return Promise.resolve(this.response);
    }

    mockSuccessfullResponse(data: any) {
        this.response = [data, null];
    }

    mockErroredResponse(data: any = {}) {
        this.response = [null, data];
    }
}
