import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import './App.css';

function Home() {
  return <h1>Ini Halaman Home</h1>
}

function ListView() {
  return (
    <div>
      <h1>Semua User</h1>
      <ul>
        <Link to="user/iqbal">Iqbal</Link> <br />
        <Link to="user/roger">Roger</Link>
      </ul>
    </div>
  )
}

function DetailView({ match }) {
  return <h2>Ini Halaman {match.params.name}</h2>
}

function noMatch() {
  return <h1>404, Halaman tidak ditemukan</h1>
}

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
        <nav>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">User</Link></li>
        </nav>

        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={ListView} />
            <Route path="/user/:name" exact component={DetailView} />
            <Route component={noMatch} />
          </Switch>
        </main>
      </div>
      </BrowserRouter>
    )
  }
  
}

export default App;
