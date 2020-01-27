"use strict";

import axios, { AxiosResponse } from "axios";
import { AxiosHttpClient } from "@/core/http/AxiosHttpClient";
import { HttpClient } from "@/core/http/HttpClient";

jest.mock("axios");

const API_URL = "/test";
const GET_PARAMS = { key: "value" };
const POST_BODY = { key: "value" };

let client: HttpClient;
let httpResponse: AxiosResponse;

describe("AxiosHttpClient", () => {
    beforeEach(() => {
        client = new AxiosHttpClient();
        httpResponse = {
            data: "data"
        } as AxiosResponse;
        mockAxiosResponse(httpResponse);
    });

    it("should handle get method with right arguments", async () => {
        await client.get(API_URL, GET_PARAMS);
        expect(axios.get).toHaveBeenCalledWith(API_URL, { params: GET_PARAMS });
    });

    it("should handle post method with right arguments", async () => {
        await client.post(API_URL, POST_BODY);
        expect(axios.post).toHaveBeenCalledWith(API_URL, POST_BODY);
    });

    it("should return right payload for get request with 2xx status", async () => {
        mockAxiosResponse(httpResponse, 201);
        const res = await client.get(API_URL, GET_PARAMS);
        expect(res).toEqual([httpResponse, null]);
    });

    it("should return right payload for get request with 4xx status", async () => {
        mockAxiosResponse(httpResponse, 400);
        const res = await client.get(API_URL, GET_PARAMS);
        expect(res).toEqual([null, expect.any(Object)]);
    });

    it("should return right payload for get request with 5xx status", async () => {
        mockAxiosResponse(httpResponse, 500);
        const res = await client.get(API_URL, GET_PARAMS);
        expect(res).toEqual([null, expect.any(Object)]);
    });

    it("should return right payload for errored get request", async () => {
        mockAxiosError();
        const res = await client.get(API_URL, GET_PARAMS);
        expect(res).toEqual([null, expect.any(Object)]);
    });

    it("should return right payload for post request with 2xx status", async () => {
        mockAxiosResponse(httpResponse, 201);
        const res = await client.post(API_URL);
        expect(res).toEqual([httpResponse, null]);
    });

    it("should return right payload for post request with 4xx status", async () => {
        mockAxiosResponse(httpResponse, 400);
        const res = await client.post(API_URL);
        expect(res).toEqual([null, expect.any(Object)]);
    });

    it("should return right payload for post request with 5xx status", async () => {
        mockAxiosResponse(httpResponse, 500);
        const res = await client.post(API_URL);
        expect(res).toEqual([null, expect.any(Object)]);
    });

    it("should return right payload for errored post request", async () => {
        mockAxiosError();
        const res = await client.get(API_URL);
        expect(res).toEqual([null, expect.any(Object)]);
    });
});

function mockAxiosResponse(data: Record<string, any>, status: number = 200) {
    const response = { data, status } as AxiosResponse;

    // @ts-ignore
    axios.get.mockResolvedValue(response);
    // @ts-ignore
    axios.post.mockResolvedValue(response);
}

function mockAxiosError() {
    // @ts-ignore
    axios.get.mockImplementation(() => {
        throw new Error("Dummy error");
    });
}
