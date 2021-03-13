import "./App.css";
import Footer from "./Footer";

import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  const url = new URL(window.location.href);
  const serverPort = url.searchParams.get("serverPort") || url.port;
  const { /* sendMessage, */ readyState } = useWebSocket(
    `ws://${url.hostname}:${serverPort}`,
    {
      retryOnError: true,
      shouldReconnect: () => true,
      reconnectAttempts: 100,
    }
  );

  const [data, setData] = useState();

  const getStatusLabel = useCallback(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        return <div className="AppStatus-Success">Connected</div>;
      case ReadyState.CONNECTING:
        return <div className="AppStatus-Loading">Connecting</div>;
      case ReadyState.CLOSED:
        return <div className="AppStatus-Error">Server not reachable</div>;
      default:
        return <div className="AppStatus-Error">Unknown</div>;
    }
  }, [readyState]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      fetch(`http://${url.hostname}:${serverPort}/data`)
        .then((response) => response.json())
        .then(setData);
    }
  }, [readyState, serverPort, url.hostname]);

  return (
    <div className="App">
      {getStatusLabel()}
      <div id="data" className="App-section">
        {data ? JSON.stringify(data) : "No data"}
      </div>

      <Footer />
    </div>
  );
}
