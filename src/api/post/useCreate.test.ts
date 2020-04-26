import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import { useCreate } from "./useCreate";
import client from "../client";

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

test("should create new post data", async () => {
  const spy = jest.spyOn(client, "post");
  const mockClient = new MockAdapter(client);
  mockClient.onPost("/posts", mockedData).reply(200, mockedData);

  const { result, waitForNextUpdate } = renderHook(() => useCreate());

  act(() => {
    result.current[0](mockedData);
  });

  expect(result.current[1].loading).toBeTruthy();

  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current[1].error).toBeNull();
  expect(result.current[1].loading).toBeFalsy();
  expect(result.current[1].data).toEqual(mockedData);
});

test("should throw error on create new post data", async () => {
  const spy = jest.spyOn(client, "post");
  const mockClient = new MockAdapter(client);
  mockClient.onPost("/posts", mockedData).reply(400);

  const { result, waitForNextUpdate } = renderHook(() => useCreate());

  act(() => {
    result.current[0](mockedData);
  });

  expect(result.current[1].loading).toBeTruthy();

  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current[1].error).not.toBeNull();
  expect(result.current[1].loading).toBeFalsy();
  expect(result.current[1].data).toEqual(null);
});
