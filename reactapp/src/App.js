import React, { Component } from 'react';
import './App.css';
import Navbar from "./Layout/Navbar";
import Activities from "./components/Activities";
import AddActivity from "./forms/AddActivity";
import UpdateActivity from "./forms/UpdateActivity";
import AddUser from "./AddUser";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Contribute from './pages/Contribute';
import Login from "./Login";
import Dashboard from './Dashboard';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container"></div>
        <Navbar title="Activity App" />
        <hr />

        <Route exact path="/register" component={AddUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Activities} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/add" component={AddActivity} />
        <Route exact path="/edit/:id" component={UpdateActivity} />
        <Route exact path="/github" component={Contribute} />

      </Router>

    );
  }
}
export default App;