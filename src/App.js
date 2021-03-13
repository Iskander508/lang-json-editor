import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <div id="home" className="App-section">
          Test
        </div>
      </div>

      <Footer />
    </>
  );
}
