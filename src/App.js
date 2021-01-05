import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { fetchAll as fetchTodos } from "./actions/todo_items";
import { fetchAll as fetchBuckets } from "./actions/bucket";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchBuckets());
  }, []);

  return (
    <Router>
      <div>
        <div className="container">
          <Route exact path="/" render={() => (
            <React.Fragment>
              <Dashboard />
            </React.Fragment>
          )} />
        </div>
      </div>
    </Router>
  );
}

export default App;