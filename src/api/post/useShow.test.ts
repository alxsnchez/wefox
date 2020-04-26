import { renderHook } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import client from "../client";
import { useShow } from "./useShow";

const mockedData = {
  id: 1,
  title: "Madrid",
  content:
    "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.",
  lat: "40.41678",
  long: "-3.70379",
  image_url: "https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg",
  created_at: "2020-03-27T14:10:06.351Z",
  updated_at: "2020-03-27T14:10:06.351Z",
};

test("should get single post data", async () => {
  const spy = jest.spyOn(client, "get");
  const mockClient = new MockAdapter(client);
  mockClient.onGet("/posts/1").reply(200, mockedData);

  const { result, waitForNextUpdate } = renderHook(() => useShow("1"));

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current.error).toBeNull();
  expect(result.current.loading).toBeFalsy();
  expect(result.current.data).toEqual(mockedData);
});

test("should throw error on get single post data", async () => {
  const spy = jest.spyOn(client, "get");
  const mockClient = new MockAdapter(client);
  mockClient.onGet("/posts/1").reply(400);

  const { result, waitForNextUpdate } = renderHook(() => useShow("1"));

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current.error).not.toBeNull();
  expect(result.current.loading).toBeFalsy();
  expect(result.current.data).toEqual(null);
});
