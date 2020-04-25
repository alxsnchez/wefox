import { useEffect, useState } from "react";
import { client } from "../client";
import { FetchResult } from "../types";

export const useShow = (id: string): FetchResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    client
      .get(`/posts/${id}`)
      .then(({ data }) => setData(data))
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
};
