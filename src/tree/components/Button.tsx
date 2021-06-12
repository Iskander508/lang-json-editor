import styled from "styled-components";
import React, { useCallback } from "react";

type TButtonProps = React.HTMLAttributes<HTMLSpanElement> & {
  loading?: boolean;
};

export function Button({ onClick, loading, ...props }: TButtonProps) {
  const handleClick = useCallback(
    (...args: Parameters<React.MouseEventHandler<HTMLSpanElement>>) => {
      if (loading) return;
      onClick?.(...args);
    },
    [loading, onClick]
  );

  return <StyledButton onClick={handleClick} loading={loading} {...props} />;
}

export const StyledButton = styled.span`
  cursor: pointer;
  vertical-align: middle;
  padding: 0;
  border: none;
  background: none;
  opacity: 0.5;
  min-width: 1em;
  margin: 0 3px;

  &:hover {
    opacity: ${({ loading }: { loading?: boolean }) => (loading ? "0.5" : "1")};
    font-weight: bold;
  }

  &:hover > * {
    transform: scale(1.5, 1.5);
  }
`;
