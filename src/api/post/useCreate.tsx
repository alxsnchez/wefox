import { useState } from "react";
import { client } from "../client";
import { Post } from "./types";
import { FetchResult } from "../types";

export const useCreate = (): [(post: Post) => void, FetchResult] => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const action = (post: Post) => {
    setLoading(true);
    client
      .post("/posts", post)
      .then(({ data }) => setData(data))
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  return [action, { data, loading, error }];
};
