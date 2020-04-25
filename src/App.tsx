import React from "react";
import Post from "./api/post";

function App() {
  const { data, loading, error } = Post.useList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Couldn't retrieve resouce</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
