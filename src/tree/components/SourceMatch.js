import React from "react";
import styled from "styled-components";
import { MatchType } from "../../protocol";

export function SourceMatch({ file, line, contextStartLine, context, type }) {
  return (
    <Container type={type}>
      <Header>
        <FileName>{file}</FileName>:{line}
      </Header>
      {context.map((l, index) => {
        const highlighted = line === index + contextStartLine;
        return (
          <Line key={index} highlighted={highlighted}>
            <LineNumber highlighted={highlighted}>
              {index + contextStartLine}
            </LineNumber>
            <LineContent>{l}</LineContent>
          </Line>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  border: 0.5px solid black;
  border-color: ${({ type }) =>
    type === MatchType.EXACT ? "black" : "darkseagreen"};
  font-family: monospace, monospace;
`;
const Header = styled.div`
  background-color: lightgrey;
  padding: 0 8px;
`;
const FileName = styled.span`
  font-weight: bold;
`;
const Line = styled.div`
  background-color: ${({ highlighted }) =>
    highlighted ? "lightgreen" : "transparent"};
  margin: 0 8px;
`;
const LineNumber = styled.span`
  color: ${({ highlighted }) => (highlighted ? "black" : "lightgrey")};
  margin: 0 8px;
`;
const LineContent = styled.pre`
  display: inline;
  margin: 0;
`;
