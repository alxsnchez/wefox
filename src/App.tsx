import React, { useContext, useEffect } from "react";
import GMap from "./components/GMap";
import styled from "styled-components";
import { Post } from "./api/post";
import PostModal from "./components/modals/Post.modal";
import Button from "./components/Button";
import { StoreContext } from "./store/Store.context";
import { Post as PostType } from "./store/Store.types";
import LocationCard from "./components/LocationCard";
import { listPosts, closeModal, openCreateModal } from "./store/Store.actions";

function getLocations(data: PostType[]) {
  return data?.map((item) => ({
    id: item.id,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.long),
  }));
}

function App() {
  const {
    state: { posts, modal },
    dispatch,
  } = useContext(StoreContext);
  const { data, loading } = Post.useList();

  useEffect(() => {
    dispatch(listPosts(data));
  }, [data, dispatch]);

  return (
    <React.Fragment>
      <GMap locations={getLocations(posts)} />
      <Container>
        <Row>
          <Headline>Your locations</Headline>
          <Button
            onClick={() => dispatch(openCreateModal())}
            variant="contained"
          >
            Add location
          </Button>
        </Row>
        <Grid>
          {posts?.map((item: PostType) => (
            <LocationCard key={item.id} item={item} />
          ))}
        </Grid>
        {loading && <Subtitle>Loading your locations...</Subtitle>}
        {posts?.length < 1 && (
          <Subtitle>Add new locations to see them here.</Subtitle>
        )}
        <PostModal open={modal.open} onClose={() => dispatch(closeModal())} />
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0px;

  @media (max-width: 1279px) {
    width: calc(100% - 40px);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;

  @media (max-width: 1279px) {
    flex-direction: column;
  }
`;

const Grid = styled.div`
  display: flex;
  margin: -8px;
  flex-wrap: wrap;
`;

const Headline = styled.span`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;

  @media (max-width: 1279px) {
    margin-bottom: 16px;
  }
`;

const Subtitle = styled.span`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  margin-bottom: 8px;
  flex: 1;
`;

export default App;
