import styled from "styled-components";

export const Button = styled.span`
  cursor: pointer;
  vertical-align: middle;
  padding: 0;
  border: none;
  background: none;
  opacity: 0.5;
  min-width: 1em;
  margin: 0 3px;

  &:hover {
    opacity: 1;
    font-weight: bold;
  }

  &:hover > * {
    transform: scale(1.5, 1.5);
  }
`;
