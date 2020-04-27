import React from "react";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number;
  src: string;
  alt: string;
}

const AspectRatio: React.FC<Props> = ({
  ratio,
  src,
  alt,
  children,
  ...props
}) => {
  return (
    <BaseAspectRatio ratio={ratio} {...props}>
      <AspectRatioImage src={src} alt={alt} />
      {children}
    </BaseAspectRatio>
  );
};

export const AspectRatioImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: 100;
`;

export const BaseAspectRatio = styled.div<Partial<Props>>`
  position: relative;
  width: 100%;
  padding-top: ${({ ratio }) => ratio && ratio * 100}%;
`;

export default AspectRatio;
