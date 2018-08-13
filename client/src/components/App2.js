import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import './styles/App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      endpoint: "http://127.0.0.1:8000",
      color: "white"
    }
  }

  send = () =>{
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color);
  }

  setColor = color => {
    this.setState({color});
  }

  render() {
    
    const socket = socketIOClient(this.state.endpoint);

    socket.on('change color', color => {
      document.body.style.backgroundColor = color;
    })

    return (
      <div className="App">
        <button onClick={() => this.send()}>Change Color</button>
        <button onClick={() => this.setColor('blue')}>Blue</button>
        <button onClick={() => this.setColor('red')}>Red</button>
      </div>
    );
  }
}

export default App;
