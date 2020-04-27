import React from "react";
import styled, { css } from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "contained";
}

const Button: React.FC<Props> = ({ variant = "text", ...props }) => {
  return <BaseButton variant={variant} {...props} />;
};

const BaseButton = styled.button<Props>`
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

  ${({ variant }) => {
    if (variant === "contained") {
      return css`
        color: #ffffff;
        background-color: #ff9f00;
        :hover {
          background-color: #f09600;
        }
        :disabled {
          background-color: #ffe0ab;
        }
      `;
    }

    if (variant === "text") {
      return css`
        color: #2b2b2b;
        background-color: transparent;
        :hover {
          background-color: #e7e7e7;
        }
        :disabled {
          background-color: transparent;
          color: #bebebe;
        }
      `;
    }
  }}
`;

export default Button;
