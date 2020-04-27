import React, { useContext, useEffect } from "react";
import GMap from "./components/GMap";
import styled from "styled-components";
import { Post } from "./api/post";
import PostModal from "./components/modals/Post.modal";
import Button from "./components/Button";
import AspectRatio from "./components/AspectRatio";
import { StoreContext, Post as PostType } from "./Store";

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
  const [removePost, { loading: removeLoading }] = Post.useRemove();

  useEffect(() => {
    dispatch({ type: "LIST_POSTS", payload: data });
  }, [data, dispatch]);

  return (
    <React.Fragment>
      <GMap locations={getLocations(posts)} />
      <Container>
        <Row>
          <Headline>Your locations</Headline>
          <Button
            onClick={() => dispatch({ type: "OPEN_CREATE_MODAL" })}
            variant="contained"
          >
            Add location
          </Button>
        </Row>
        <Grid>
          {posts?.map((item: PostType) => (
            <Paper key={item.id}>
              <AspectRatio
                ratio={9 / 16}
                src={item.image_url}
                alt={item.title}
              />
              <Content>
                <Title>{item.title}</Title>
                <Subtitle>{item.content}</Subtitle>
                <Actions>
                  <Button
                    style={{ marginRight: 8 }}
                    disabled={removeLoading}
                    onClick={async () => {
                      const confirmed = window.confirm(
                        "You are about to delete this location. Are you sure?"
                      );
                      if (confirmed) {
                        await removePost(item.id);
                        dispatch({ type: "REMOVE_POST", payload: item.id });
                      }
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      dispatch({ type: "OPEN_EDIT_MODAL", payload: item.id })
                    }
                  >
                    Edit
                  </Button>
                </Actions>
              </Content>
            </Paper>
          ))}
        </Grid>
        {loading && <Subtitle>Loading your locations...</Subtitle>}
        {posts?.length < 1 && (
          <Subtitle>Add new locations to see them here.</Subtitle>
        )}
        <PostModal
          open={modal.open}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        />
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

const Title = styled.span`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  margin-bottom: 8px;
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

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 8px;
  width: calc(100% / 3 - 16px);
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 2px 0 rgba(63, 63, 68, 0.15);

  @media (min-width: 800px) and (max-width: 1279px) {
    width: calc(100% / 2 - 16px);
  }

  @media (max-width: 799px) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  height: 100%;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default App;
