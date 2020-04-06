import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../src/components/Home'
import Login from '../src/components/Login'
import Register from '../src/components/Register'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import AddBook from './components/AddBook'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/book/:bookId" component={SingleBook} />
        <Route exact path="/addbook" component={AddBook} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
