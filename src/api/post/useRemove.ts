import { useState } from "react";
import client from "../client";
import { FetchResult } from "../types";

export const useRemove = (): [(id: number) => Promise<any>, FetchResult] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const action = (id: number) => {
    setLoading(true);
    return client
      .delete(`/posts/${id}`)
      .then(({ data }) => setData(null))
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return [action, { data, loading, error }];
};
