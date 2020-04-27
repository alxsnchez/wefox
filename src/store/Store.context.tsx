import React, { createContext, useReducer } from "react";
import { State } from "./Store.types";
import storeReducer from "./Store.reducer";
import Modal from "../components/Modal";
import { closeModal } from "./Store.actions";

export const initialState: State = {
  posts: [],
  modal: {
    open: false,
    type: "create",
  },
};

export const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
      <Modal open={state.modal.open} onClose={() => dispatch(closeModal())} />
    </StoreContext.Provider>
  );
};
