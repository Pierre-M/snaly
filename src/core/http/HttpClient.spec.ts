import HttpClient from "@/core/http/HttpClient";
import axios from "axios";
import faker from "faker";
import Mock = jest.Mock;

jest.mock("axios");

describe("HttpClient", () => {
  let client: HttpClient;

  beforeEach(() => {
    client = new HttpClient();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.unmock("axios");
  });

  describe("get", () => {
    const url = faker.internet.url();
    const params = faker.random.objectElement<object>();

    it("should call for Axios get method with right arguments", () => {
      client.get(url, params);

      expect(axios.get).toHaveBeenCalledWith(url, { params });
    });

    it("should return Axios response", async () => {
      const response = faker.random.objectElement();
      (axios.get as Mock).mockResolvedValue(response);

      const res = await client.get(url, params);

      expect(res).toEqual(response);
    });
  });

  describe("post", () => {
    const url = faker.internet.url();
    const body = faker.random.objectElement<object>();

    it("should call for Axios post method with right arguments", () => {
      client.post(url, body);

      expect(axios.post).toHaveBeenCalledWith(url, body);
    });

    it("should return Axios response", async () => {
      const response = faker.random.objectElement();
      (axios.post as Mock).mockResolvedValue(response);

      const res = await client.post(url, body);

      expect(res).toEqual(response);
    });
  });
});
