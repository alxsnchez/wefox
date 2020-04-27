import { useState } from "react";
import client from "../client";
import { FetchResult } from "../types";

export interface PostUpdate {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
}

export const useUpdate = (): [
  (id: number, post: Partial<PostUpdate>) => Promise<any>,
  FetchResult
] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const action = (id: number, post: Partial<PostUpdate>) => {
    setLoading(true);
    return client
      .put(`/posts/${id}`, post)
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
