import { useState } from "react";
import { client } from "../client";
import { Post } from "./types";
import { FetchResult } from "../types";

export const useUpdate = (): [
  (id: string, post: Partial<Post>) => void,
  FetchResult
] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const action = (id: string, post: Partial<Post>) => {
    setLoading(true);
    client
      .put(`/posts/${id}`, post)
      .then(({ data }) => setData(data))
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return [action, { data, loading, error }];
};
