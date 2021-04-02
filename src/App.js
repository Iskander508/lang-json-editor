import Footer from "./Footer";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useEffect, useState } from "react";
import Tree from "./tree/Tree";
import styled from "styled-components";
import { ActionType } from "./protocol";
import { getServerHost } from "./tree/util";

export default function App() {
  const serverHost = getServerHost();

  const [matches, setMatches] = useState();
  const [data, setData] = useState();
  const handleIncomingMessage = useCallback((action) => {
    switch (action.action) {
      case ActionType.DATA_UPDATE:
        setData(action.data);
        break;
      case ActionType.MATCHES_UPDATE:
        setMatches(action.data);
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

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      fetch(`http://${serverHost}/data`)
        .then((response) => response.json())
        .then(setData);
    }
  }, [readyState, serverHost]);

  return (
    <AppContainer>
      <ConnectionStatus status={readyState}>
        {getStatusLabel()}
      </ConnectionStatus>
      <Content>
        {!data && "No data"}
        <Tree
          data={data}
          matches={matches}
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

const Content = styled.div`
  flex: 1;
  min-width: 800px;
  max-width: 95vw;
  margin: 0 40px;
  padding-top: 15px;
  flex-direction: column;
  align-items: center;
`;

const ConnectionStatus = styled.div`
  color: ${({ status }) =>
    status === ReadyState.OPEN
      ? "darkgreen"
      : status === ReadyState.CONNECTING
      ? "black"
      : "darkred"};
`;
