import { useEffect, useState } from "react";
import client from "../client";
import { FetchResult } from "../types";

export const useList = (): FetchResult => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    client
      .get("/posts")
      .then(({ data }) => setData(data))
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
