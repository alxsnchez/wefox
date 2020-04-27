import {
  ActionTypes,
  Post,
  LIST_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  OPEN_CREATE_MODAL,
  OPEN_EDIT_MODAL,
  CLOSE_MODAL,
} from "./Store.types";

export const listPosts = (posts: Post[]): ActionTypes => {
  return {
    type: LIST_POSTS,
    posts,
  };
};

export const addPost = (post: Post): ActionTypes => {
  return {
    type: ADD_POST,
    post,
  };
};

export const editPost = (post: Partial<Post>): ActionTypes => {
  return {
    type: EDIT_POST,
    post,
  };
};

export const deletePost = (id: number): ActionTypes => {
  return {
    type: DELETE_POST,
    id,
  };
};

export const openCreateModal = (): ActionTypes => {
  return {
    type: OPEN_CREATE_MODAL,
  };
};

export const openEditModal = (id: number): ActionTypes => {
  return {
    type: OPEN_EDIT_MODAL,
    id,
  };
};

export const closeModal = (): ActionTypes => {
  return {
    type: CLOSE_MODAL,
  };
};
