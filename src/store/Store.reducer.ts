import {
  LIST_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  OPEN_CREATE_MODAL,
  OPEN_EDIT_MODAL,
  CLOSE_MODAL,
  Post,
  ActionTypes,
} from "./Store.types";

const storeReducer = (state: any, action: ActionTypes) => {
  switch (action.type) {
    case LIST_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.post),
      };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((item: Post) => {
          if (item.id !== action.post.id) {
            return item;
          }
          return {
            ...item,
            ...action.post,
          };
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((item: Post) => item.id !== action.id),
      };
    case OPEN_CREATE_MODAL:
      return {
        ...state,
        modal: {
          open: true,
          type: "create",
        },
      };
    case OPEN_EDIT_MODAL:
      return {
        ...state,
        modal: {
          open: true,
          type: "edit",
          postId: action.id,
        },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          open: false,
        },
      };
    default:
      throw new Error();
  }
};

export default storeReducer;
