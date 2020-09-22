import React from 'react';
import GlobalStyle from './globalStyles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Section from './components/Section'
import {DataProvider} from './components/Context'

function App(){
  return(
    <Router>
      <GlobalStyle/>
      <Switch>
      <Route path='/'exact path component={Header}/>
      <Route path='/section' component={Section}/>
      <Route path='/dataProvider' component={DataProvider}/>
      </Switch>
    </Router>
  );
}
export default App;


