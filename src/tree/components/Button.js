import styled from "styled-components";
import React, { useCallback } from "react";

export function Button({ onClick, loading, ...props }) {
  const handleClick = useCallback((...args) => {
    if (loading) return;
    onClick?.(...args);
  }, [loading, onClick]);

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
    opacity: ${({ loading }) => (loading ? "0.5" : "1")};
    font-weight: bold;
  }

  &:hover > * {
    transform: scale(1.5, 1.5);
  }
`;
