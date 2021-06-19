import Footer from "./Footer";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useEffect, useState, useMemo } from "react";
import Tree from "./tree/Tree";
import { Problem, NO_PROBLEM } from "./tree/problem";
import styled from "styled-components";
import { ActionType } from "./protocol";
import { getServerHost } from "./tree/util";
import { TSourceMatch } from "./tree/components/SourceMatch";
import Parse from "parse";
import { initializeParse, useParseQuery } from "@parse/react";

initializeParse(
  "https://translation.b4a.io/",
  "ZqSPDyNGkCzQYoQfxgGEUgpO4tp9Rc7z4DhJQNWI",
  "6aZHlL6cm2kX99WmKTATP7rZUCGvPmNNpFF76EqM"
);

export default function App() {
  const languages = useParseQuery(
    new Parse.Query("Language"), // The Parse Query to be used
    {
      enableLocalDatastore: true,
      enableLiveQuery: false,
    }
  );
  const translations = useParseQuery(
    new Parse.Query("Translation").equalTo("objectId", "owp5Fexxtk"), // The Parse Query to be used
    {
      enableLocalDatastore: true,
      enableLiveQuery: true,
    }
  );
  console.log(languages, translations);

  const serverHost = getServerHost();

  const [collapseAll, setCollapseAll] = useState<boolean>();

  const [caseSensitive, setCaseSensitive] = useState(false);
  const [filter, setFilter] = useState("");
  const [showProblemsFilter, setShowProblemsFilter] = useState(false);
  const [filteredProblems, setFilteredProblems] = useState<
    Array<Problem | typeof NO_PROBLEM>
  >([]);

  const [sourceMatches, setSourceMatches] = useState<TSourceMatch[]>();
  const [data, setData] = useState();
  const handleIncomingMessage = useCallback((action) => {
    switch (action.action) {
      case ActionType.DATA_UPDATE:
        setData(action.data);
        break;
      case ActionType.SOURCE_MATCHES_UPDATE:
        setSourceMatches(action.data);
        break;
      default:
        console.error("Invalid action:", action.action);
        break;
    }
  }, []);

  const { sendMessage, readyState } = useWebSocket(`ws://${serverHost}`, {
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 100,
    onMessage: (ev) => handleIncomingMessage(JSON.parse(ev.data)),
  });

  const getStatusLabel = useCallback(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        return "Connected";
      case ReadyState.CONNECTING:
        return "Connecting";
      case ReadyState.CLOSED:
        return "Server not reachable";
      default:
        return "Unknown";
    }
  }, [readyState]);

  const onSendMessage = useCallback(
    (message) => {
      sendMessage(JSON.stringify(message));
    },
    [sendMessage]
  );

  const onCollapseChange = useCallback(() => setCollapseAll(undefined), []);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      fetch(`http://${serverHost}/data`)
        .then((response) => response.json())
        .then(setData);
    }
  }, [readyState, serverHost]);

  const hasSources = !!sourceMatches;
  const ALL_PROBLEMS = useMemo(
    () =>
      (
        [NO_PROBLEM, ...Object.values(Problem)] as Array<
          Problem | typeof NO_PROBLEM
        >
      ).filter(
        (p) =>
          hasSources ||
          (p !== Problem.NO_MATCH_IN_SOURCES &&
            p !== Problem.PARTIAL_MATCH_IN_SOURCES)
      ),
    [hasSources]
  );

  return (
    <AppContainer>
      <TopBar>
        <ConnectionStatus status={readyState}>
          {getStatusLabel()}
        </ConnectionStatus>
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
            <ProblemsFilterWrapper>
              <button onClick={() => setShowProblemsFilter((s) => !s)}>
                Problems
              </button>
              {showProblemsFilter && (
                <ProblemsFilter>
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
                </ProblemsFilter>
              )}
            </ProblemsFilterWrapper>
          </span>
        </Filter>
      </TopBar>
      <Content>
        {!data && "No data"}
        <Tree
          data={data}
          sourceMatches={sourceMatches}
          collapseAll={collapseAll}
          onCollapseChange={onCollapseChange}
          filter={{ text: filter, caseSensitive, problems: filteredProblems }}
          onSendMessage={onSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        />
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

const ProblemsFilterWrapper = styled.div`
  position: relative;
`;

const FilterInput = styled.input`
  font-family: monospace, monospace;
  font-size: 16px;
  padding: 0 8px;
  margin-left: 1em;
  min-width: min(50vw, 400px);
`;

const ProblemsFilter = styled.div`
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

const ConnectionStatus = styled.span`
  color: ${({ status }: { status: ReadyState }) =>
    status === ReadyState.OPEN
      ? "darkgreen"
      : status === ReadyState.CONNECTING
      ? "black"
      : "darkred"};
`;
