import { useState } from "react";
import client from "../client";
import { FetchResult } from "../types";

export interface PostCreate {
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
}

export const useCreate = (): [
  (post: PostCreate) => Promise<any>,
  FetchResult
] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const action = (post: PostCreate) => {
    setLoading(true);
    return client
      .post("/posts", post)
      .then(({ data }) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return [action, { data, loading, error }];
};
