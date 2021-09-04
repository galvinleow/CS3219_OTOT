import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import Tracker from "./components/Tracker";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Route path="/tracker" component={Tracker} />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
