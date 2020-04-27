import React, { createContext, useReducer } from "react";

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

interface State {
  posts: Post[];
  modal: {
    open: boolean;
    type: "create" | "edit";
    postId?: number;
  };
}

const initialState: State = {
  posts: [],
  modal: {
    open: false,
    type: "create",
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LIST_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };
    case "EDIT_POST":
      return {
        ...state,
        posts: state.posts.map((item: Post) => {
          if (item.id !== action.payload.id) {
            return item;
          }
          return {
            ...item,
            ...action.payload,
          };
        }),
      };
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter((item: Post) => item.id !== action.payload),
      };
    case "OPEN_CREATE_MODAL":
      return {
        ...state,
        modal: {
          open: true,
          type: "create",
        },
      };
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        modal: {
          open: true,
          type: "edit",
          postId: action.payload,
        },
      };
    case "CLOSE_MODAL":
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

export const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
