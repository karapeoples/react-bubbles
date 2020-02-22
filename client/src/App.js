import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BubblesPage from "./components/BubblePage";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/bubbles-page" component={BubblesPage} />
        <Route exact path="/" component={Login} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
