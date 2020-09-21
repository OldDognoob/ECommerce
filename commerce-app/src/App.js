//react
import React from "react";
//redux
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
//components
import Header from "./components/Header";
import Section from "./components/Section";
import {DataProvider} from "./components/Context";

function App(){
  return (
    <DataProvider>
      <div className="app">
        <Router>
          <Header/>
          <Section/>
        </Router>
      </div>
    </DataProvider>
  );
}
export default App;
