import React from "react";
import GMap from "./components/GMap";
import styled from "styled-components";
import { Post } from "./api/post";
import { Post as PostType } from "./api/post/types";

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -8px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: #ff9f00;
  color: #ffffff;
  font-weight: 700;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  padding: 8px 24px;
  transition: background-color 250ms ease;

  :hover {
    background-color: #f09600;
  }
`;

const Headline = styled.span`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 2.125rem;
  line-height: 1.235;
  letter-spacing: 0.00735em;
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
`;

const Paper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 8px;
  width: calc(100% / 3 - 16px);
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
    0 1px 2px 0 rgba(63, 63, 68, 0.15);
`;

const AspectRatio = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;

function getLocations(data: PostType[]) {
  return data?.map((item) => ({
    lat: parseFloat(item.lat),
    lng: parseFloat(item.long),
  }));
}

function App() {
  const { data, loading } = Post.useList();
  return (
    <React.Fragment>
      <GMap locations={getLocations(data)} />
      <Container>
        <Row>
          <Headline>Your locations</Headline>
          <Button>Add location</Button>
        </Row>
        <Grid>
          {data?.map((item: PostType) => (
            <Paper>
              <AspectRatio>
                <Image alt="" src={item.image_url} />
              </AspectRatio>
              <Content>
                <Title>{item.title}</Title>
                <Subtitle>{item.content}</Subtitle>
              </Content>
            </Paper>
          ))}
        </Grid>
        {loading && <Subtitle>Loading your locations...</Subtitle>}
      </Container>
    </React.Fragment>
  );
}

export default App;
