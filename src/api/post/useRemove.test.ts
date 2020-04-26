import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import client from "../client";
import { useRemove } from "./useRemove";

test("should remove single post data", async () => {
  const spy = jest.spyOn(client, "delete");
  const mockClient = new MockAdapter(client);
  mockClient.onDelete("/posts/1").reply(204);

  const { result, waitForNextUpdate } = renderHook(() => useRemove());

  act(() => {
    result.current[0]("1");
  });

  expect(result.current[1].loading).toBeTruthy();

  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current[1].error).toBeNull();
  expect(result.current[1].loading).toBeFalsy();
  expect(result.current[1].data).toBeNull();
});

test("should throw error on remove single post data", async () => {
  const spy = jest.spyOn(client, "delete");
  const mockClient = new MockAdapter(client);
  mockClient.onDelete("/posts/1").reply(400);

  const { result, waitForNextUpdate } = renderHook(() => useRemove());

  act(() => {
    result.current[0]("1");
  });

  expect(result.current[1].loading).toBeTruthy();

  await waitForNextUpdate();

  expect(spy).toHaveBeenCalled();
  expect(result.current[1].error).not.toBeNull();
  expect(result.current[1].loading).toBeFalsy();
  expect(result.current[1].data).toBeNull();
});
