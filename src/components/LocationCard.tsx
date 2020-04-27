import React, { useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import AspectRatio from "./AspectRatio";
import { StoreContext } from "../store/Store.context";
import { Post as PostType } from "../store/Store.types";
import { Post } from "../api/post";
import { openEditModal, deletePost } from "../store/Store.actions";

interface Props {
  item: PostType;
}

const LocationCard: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(StoreContext);
  const [removePost, { loading }] = Post.useRemove();
  return (
    <Paper>
      <AspectRatio ratio={9 / 16} src={item.image_url} alt={item.title} />
      <Content>
        <Title>{item.title}</Title>
        <Subtitle>{item.content}</Subtitle>
        <Actions>
          <Button
            style={{ marginRight: 8 }}
            disabled={loading}
            onClick={async () => {
              const confirmed = window.confirm(
                "You are about to delete this location. Are you sure?"
              );
              if (confirmed) {
                await removePost(item.id);
                dispatch(deletePost(item.id));
              }
            }}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch(openEditModal(item.id))}
          >
            Edit
          </Button>
        </Actions>
      </Content>
    </Paper>
  );
};

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

export default LocationCard;
