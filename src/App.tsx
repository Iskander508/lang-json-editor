import Footer from "./Footer";
import { useCallback, useState } from "react";
import Tree from "./tree/Tree";
import styled from "styled-components";
import { useParse } from "./parse";
import LanguagesSelection from "./LanguagesSelection";
import TreeCollapse from "./TreeCollapse";
import ProblemsSelection, { SelectedProblem } from "./ProblemsSelection";
import Import from "./Import";
import Export from "./Export";

export default function App() {
  const { data, onAdd, onChangeValue, onRemove, onImportJson } = useParse();

  const [languages, setLanguages] = useState<string[]>([]);

  const [collapseAll, setCollapseAll] = useState<boolean>();
  const onCollapseChange = useCallback(() => setCollapseAll(undefined), []);

  const [caseSensitive, setCaseSensitive] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredProblems, setFilteredProblems] = useState<
    Array<SelectedProblem>
  >([]);

  return (
    <AppContainer>
      <TopBar>
        <LanguagesSelection onSelectionChange={setLanguages} />
        <TreeCollapse
          collapseAll={collapseAll}
          onCollapseAll={setCollapseAll}
        />
        {onImportJson && <Import onImport={onImportJson} />}
        {data && <Export data={data} />}
        <Filter>
          <span>
            <NonSelectable>Filter:</NonSelectable>
            <FilterInput
              onChange={(event) => setFilter(event.target.value.trim())}
            />
            <input
              type="checkbox"
              name="case sensitive"
              checked={caseSensitive}
              onChange={(event) => setCaseSensitive(event.target.checked)}
            />
            <NonSelectable onClick={() => setCaseSensitive((x) => !x)}>
              case sensitive
            </NonSelectable>
            <ProblemsSelection
              filteredProblems={filteredProblems}
              onChange={setFilteredProblems}
            />
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

const Filter = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-around;
`;

const FilterInput = styled.input`
  font-family: monospace, monospace;
  font-size: 16px;
  padding: 0 8px;
  margin-left: 1em;
  min-width: min(50vw, 400px);
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

const NonSelectable = styled.span`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
