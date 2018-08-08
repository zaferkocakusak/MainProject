import React, { Component } from 'react';
import './App.css';
import ToDoApp from './ToDoApp.js'; 
import 'antd/dist/antd.css';


class App extends Component {
	
  render() {
	  console.log('App Render')
    return (
      <div className="App">
		<ToDoApp/>
		</div>
    );
  }
}

export default App;

