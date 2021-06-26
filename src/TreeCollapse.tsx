import styled from "styled-components";

export default function TreeCollapse(props: {
  collapseAll?: boolean;
  onCollapseAll: (collapse: boolean) => void;
}) {
  return (
    <Collapse>
      <span>
        <button
          disabled={props.collapseAll === false}
          onClick={() => props.onCollapseAll(false)}
          title="Expand All"
        >
          +
        </button>
        <button
          disabled={props.collapseAll}
          onClick={() => props.onCollapseAll(true)}
          title="Collapse All"
        >
          -
        </button>
      </span>
    </Collapse>
  );
}

const Collapse = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;
