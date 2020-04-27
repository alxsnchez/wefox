export interface State {
  posts: Post[];
  modal: {
    open: boolean;
    type: "create" | "edit";
    postId?: number;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const LIST_POSTS = "LIST_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const OPEN_CREATE_MODAL = "OPEN_CREATE_MODAL";
export const OPEN_EDIT_MODAL = "OPEN_EDIT_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

interface ListPostsAction {
  type: typeof LIST_POSTS;
  posts: Post[];
}

interface AddPostAction {
  type: typeof ADD_POST;
  post: Post;
}

interface EditPostAction {
  type: typeof EDIT_POST;
  post: Partial<Post>;
}

interface RemovePostAction {
  type: typeof DELETE_POST;
  id: number;
}

interface OpenCreateModalAction {
  type: typeof OPEN_CREATE_MODAL;
}

interface OpenEditModalAction {
  type: typeof OPEN_EDIT_MODAL;
  id: number;
}

interface CloseModalAction {
  type: typeof CLOSE_MODAL;
}

export type ActionTypes =
  | ListPostsAction
  | AddPostAction
  | EditPostAction
  | RemovePostAction
  | OpenCreateModalAction
  | OpenEditModalAction
  | CloseModalAction;
