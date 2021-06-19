import Footer from "./Footer";
import { useCallback, useState } from "react";
import Tree from "./tree/Tree";
import { Problem, NO_PROBLEM } from "./tree/problem";
import styled from "styled-components";
import { useParse } from "./parse";

const ALL_PROBLEMS = (
  [NO_PROBLEM, ...Object.values(Problem)] as Array<Problem | typeof NO_PROBLEM>
).filter(
  (p) =>
    p !== Problem.NO_MATCH_IN_SOURCES && p !== Problem.PARTIAL_MATCH_IN_SOURCES
);

export default function App() {
  const { data, supportedLanguages, onAdd, onChangeValue, onRemove } =
    useParse();

  const [collapseAll, setCollapseAll] = useState<boolean>();

  const [caseSensitive, setCaseSensitive] = useState(false);
  const [filter, setFilter] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [showProblemsSelection, setShowProblemsSelection] = useState(false);
  const [filteredProblems, setFilteredProblems] = useState<
    Array<Problem | typeof NO_PROBLEM>
  >([]);

  const onCollapseChange = useCallback(() => setCollapseAll(undefined), []);

  return (
    <AppContainer>
      <TopBar>
        <SelectionWrapper>
          <button onClick={() => setShowLanguageSelection((s) => !s)}>
            Languages
          </button>
          {showLanguageSelection && (
            <Selection>
              {supportedLanguages.map((v) => (
                <span key={v}>
                  <input
                    type="checkbox"
                    name={v}
                    checked={languages.includes(v)}
                    onChange={(event) =>
                      setLanguages((prev) =>
                        event.target.checked
                          ? [...prev, v]
                          : prev.filter((x) => x !== v)
                      )
                    }
                  />
                  {v}
                </span>
              ))}
            </Selection>
          )}
        </SelectionWrapper>
        <Collapse>
          <span>
            <button
              disabled={collapseAll === false}
              onClick={() => setCollapseAll(false)}
              title="Expand All"
            >
              +
            </button>
            <button
              disabled={collapseAll}
              onClick={() => setCollapseAll(true)}
              title="Collapse All"
            >
              -
            </button>
          </span>
        </Collapse>
        <Filter>
          <span>
            Filter:
            <FilterInput
              onChange={(event) => setFilter(event.target.value.trim())}
            />
            <input
              type="checkbox"
              name="case sensitive"
              checked={caseSensitive}
              onChange={(event) => setCaseSensitive(event.target.checked)}
            />
            case sensitive
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
                          setFilteredProblems((prev) =>
                            event.target.checked
                              ? [...prev, v]
                              : prev.filter((x) => x !== v)
                          )
                        }
                      />
                      {v}
                    </span>
                  ))}
                </Selection>
              )}
            </SelectionWrapper>
          </span>
        </Filter>
      </TopBar>
      <Content>
        {!data ? (
          "No data"
        ) : (
          <Tree
            data={data}
            languages={languages}
            collapseAll={collapseAll}
            onCollapseChange={onCollapseChange}
            filter={{ text: filter, caseSensitive, problems: filteredProblems }}
            onAdd={onAdd}
            onChangeValue={onChangeValue}
            onRemove={onRemove}
          />
        )}
      </Content>

      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
`;

const TopBar = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
`;

const Collapse = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;

const Filter = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-around;
`;

const SelectionWrapper = styled.div`
  position: relative;
`;

const FilterInput = styled.input`
  font-family: monospace, monospace;
  font-size: 16px;
  padding: 0 8px;
  margin-left: 1em;
  min-width: min(50vw, 400px);
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

const Content = styled.div`
  flex: 1;
  min-width: 800px;
  max-width: 95vw;
  margin: 0 40px;
  padding-top: 15px;
  flex-direction: column;
  align-items: center;
`;
