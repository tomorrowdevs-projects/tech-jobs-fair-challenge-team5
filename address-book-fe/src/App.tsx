import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => <Route {...route} key={index} />)}
      </Routes>
    </Router>
  );
}

export default App;
