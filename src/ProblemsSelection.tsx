import { useState } from "react";
import { Problem, NO_PROBLEM } from "./tree/problem";
import styled from "styled-components";

export type SelectedProblem = Problem | typeof NO_PROBLEM;
export const ALL_PROBLEMS: Array<SelectedProblem> = [
  NO_PROBLEM,
  ...Object.values(Problem),
];

export default function ProblemsSelection(props: {
  filteredProblems: Array<SelectedProblem>;
  onChange: (newSelection: Array<SelectedProblem>) => void;
}) {
  const { filteredProblems, onChange } = props;
  const [showProblemsSelection, setShowProblemsSelection] = useState(false);

  return (
    <SelectionWrapper>
      <button onClick={() => setShowProblemsSelection((s) => !s)}>
        Problems
      </button>
      {showProblemsSelection && (
        <Selection>
          {ALL_PROBLEMS.map((v) => (
            <span key={v}>
              <input
                type="checkbox"
                name={v}
                checked={filteredProblems.includes(v)}
                onChange={(event) =>
                  onChange(
                    event.target.checked
                      ? [...filteredProblems, v]
                      : filteredProblems.filter((x) => x !== v)
                  )
                }
              />
              {v}
            </span>
          ))}
        </Selection>
      )}
    </SelectionWrapper>
  );
}

const SelectionWrapper = styled.div`
  position: relative;
`;

const Selection = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 0.5px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;
