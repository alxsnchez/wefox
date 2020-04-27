import React, { useLayoutEffect } from "react";
import styled, { css } from "styled-components";

interface Props {
  open: boolean;
}

const Modal: React.FC<Props> = ({ open, children }) => {
  useLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <Overlay open={open}>
      <ModalContainer open={open}>{children}</ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div<Partial<Props>>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  transition: background-color 300ms ease;
  padding: 24px;

  ${({ open }) =>
    open
      ? css`
          background-color: rgba(0, 0, 0, 0.2);
          overflow: auto;
          max-height: 100vh;
        `
      : css`
          pointer-events: none;
          background-color: rgba(0, 0, 0, 0);
        `};
`;

const ModalContainer = styled.div<Partial<Props>>`
  background-color: #ffffff;
  width: 100%;
  max-width: 500px;
  cursor: initial;
  transition: opacity 200ms ease;
  margin: auto 0;

  ${({ open }) =>
    open
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `};
`;

export const ModalTitle = styled.div`
  padding: 24px;
`;

export const ModalContent = styled.div`
  padding: 0px 24px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
`;

export default Modal;
