import React, { useContext } from "react";
import styled from "styled-components";
import { MatchType } from "../../protocol";
import { TreeContext } from "../Context";
import { vscode } from "../images";

export interface TSourceMatch {
  id: string;
  file: string;
  line: number;
  contextStartLine: number;
  context: string[];
  type: keyof typeof MatchType;
}

export function SourceMatch({
  id,
  file,
  line,
  contextStartLine,
  context,
  type,
}: TSourceMatch) {
  const { onOpen } = useContext(TreeContext);
  let idPosition: number | undefined =
    context[line - contextStartLine]?.indexOf(id);
  idPosition = idPosition === -1 ? undefined : idPosition;

  return (
    <Container type={type}>
      <Header>
        <File
          title="Open in VSCode"
          onClick={() =>
            onOpen?.(file, line, idPosition ? idPosition + 1 : undefined)
          }
        >
          <FileName>{file}</FileName>:{line}
        </File>
      </Header>
      {context.map((l, index) => {
        const highlighted = line === index + contextStartLine;
        let content = <LineContent>{l}</LineContent>;
        if (highlighted && idPosition !== undefined) {
          content = (
            <>
              <LineContent>{l.substring(0, idPosition)}</LineContent>
              <LineContent highlighted>{id}</LineContent>
              <LineContent>{l.substring(idPosition + id.length)}</LineContent>
            </>
          );
        }
        return (
          <Line key={index} highlighted={highlighted} type={type}>
            <LineNumber highlighted={highlighted}>
              {index + contextStartLine}
            </LineNumber>
            {content}
          </Line>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  border: 0.5px solid black;
  border-color: ${({ type }: { type: keyof typeof MatchType }) =>
    type === MatchType.EXACT ? "black" : "darkseagreen"};
  font-family: monospace, monospace;
`;
const Header = styled.div`
  background-color: lightgrey;
  padding: 0 8px;
`;
const File = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    :after {
      padding-left: 4px;
      content: url(${vscode});
    }
  }
`;
const FileName = styled.span`
  font-weight: bold;
`;
const Line = styled.div`
  background-color: ${({
    highlighted,
    type,
  }: {
    highlighted?: boolean;
    type: keyof typeof MatchType;
  }) =>
    highlighted
      ? type === MatchType.EXACT
        ? "lightgreen"
        : "darkseagreen"
      : "transparent"};
  margin: 0 8px;
`;
const LineNumber = styled.span`
  color: ${({ highlighted }: { highlighted?: boolean }) =>
    highlighted ? "black" : "lightgrey"};
  margin: 0 8px;
  user-select: none;
`;
const LineContent = styled.pre`
  display: inline;
  margin: 0;
  font-weight: ${({ highlighted }: { highlighted?: boolean }) =>
    highlighted ? "bold" : "normal"};
`;
