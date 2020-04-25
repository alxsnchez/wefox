import { useState } from "react";
import { client } from "../client";
import { FetchResult } from "../types";

export const useRemove = (): [(id: string) => void, FetchResult] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const action = (id: string) => {
    setLoading(true);
    client
      .delete(`/posts/${id}`)
      .then(({ data }) => setData(data))
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return [action, { data, loading, error }];
};
