import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import client from "../client";
import { useUpdate } from "./useUpdate";

const mockedData = {
  title: "Madrid",
};

test("should update single post data", async () => {
  const spy = jest.spyOn(client, "put");
  const mockClient = new MockAdapter(client);
  mockClient.onPut("/posts/1", mockedData).reply(200, mockedData);

  const { result, waitForNextUpdate } = renderHook(() => useUpdate());

  act(() => {
    result.current[0](1, mockedData);
  });

  expect(result.current[1].loading).toBeTruthy();

  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current[1].error).toBeNull();
  expect(result.current[1].loading).toBeFalsy();
  expect(result.current[1].data).toEqual(mockedData);
});

test("should throw error on update single post data", async () => {
  const spy = jest.spyOn(client, "put");
  const mockClient = new MockAdapter(client);
  mockClient.onPut("/posts/1", mockedData).reply(400);

  const { result, waitForNextUpdate } = renderHook(() => useUpdate());

  act(() => {
    result.current[0](1, mockedData);
  });

  expect(result.current[1].loading).toBeTruthy();

  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current[1].error).not.toBeNull();
  expect(result.current[1].loading).toBeFalsy();
  expect(result.current[1].data).toEqual(null);
});
