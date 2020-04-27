import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import LocationCard from "./LocationCard";
import { StoreProvider } from "../../store/Store.context";
import MockAdapter from "axios-mock-adapter";
import client from "../../api/client";

beforeAll(() => {
  window.confirm = jest.fn(() => true);
});

test("should render location card", () => {
  render(<LocationCard item={item} />);
  expect(screen.getByTestId(/title/i)).toHaveTextContent(item.title);
  expect(screen.getByTestId(/content/i)).toHaveTextContent(item.content);
  expect(screen.queryByAltText(/barcelona/i)).toHaveAttribute(
    "src",
    item.image_url
  );
  expect(screen.getByText(/remove/i)).toBeInTheDocument();
  expect(screen.getByText(/edit/i)).toBeInTheDocument();
});

test("should open edit post modal", () => {
  render(
    <StoreProvider>
      <LocationCard item={item} />
    </StoreProvider>
  );

  act(() => {
    fireEvent.click(screen.getByText(/edit/i));
  });

  expect(screen.getByText(/update location/i)).toBeInTheDocument();
});

test("should remove post", async () => {
  const spy = jest.spyOn(client, "delete");
  const mockClient = new MockAdapter(client);
  mockClient.onDelete("/posts/1").reply(204);

  render(
    <StoreProvider>
      <LocationCard item={item} />
    </StoreProvider>
  );

  act(() => {
    fireEvent.click(screen.getByText(/remove/i));
  });

  expect(window.confirm).toHaveBeenCalled();
  expect(spy).toHaveBeenCalled();
});

const item = {
  id: 2,
  title: "Barcelona",
  content:
    "Barcelona is the capital and largest city of Catalonia with a population of 1.6 million within city limits.",
  lat: "41.3851",
  long: "2.1734",
  image_url:
    "https://static.independent.co.uk/s3fs-public/styles/story_medium/public/thumbnails/image/2017/05/17/15/barcelona-skyline.jpg",
  created_at: "2020-03-27T14:10:06.358Z",
  updated_at: "2020-03-27T14:10:06.358Z",
};
