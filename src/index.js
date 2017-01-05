import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import './index.css';


//exports.username = username;
class Header extends React.Component{

  render()
  {
    return (
      <div className = "header">
  Welcome to the Chatroom!
      </div>

    )
  }
}


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      messages:[]
    }
  }

componentDidMount() {
  this.socket = io('/'); //connects to root
  var username = window.prompt("Please Enter a Username");
  console.log(username);
   this.socket.emit('setId', username);

  this.socket.on('message', message => {
    this.setState({messages: [message, ...this.state.messages]});


  });
}


  handleSubmit = event =>
  {
    const body = event.target.value; //value of input box
    if (event.keyCode === 13 && body) //checks if enter key is pressed and if body is not empty
{
  const message = {
    body,
    from: username
  }
  this.setState({messages: [message, ...this.state.messages]});
    this.socket.emit('message', body);
  event.target.value = '';
  //new message shows up at very beginning now
}
  }
render() {
  const messages =
  this.state.messages.map((message, index) => {
    return <li className = "messageBlock" key={index}> <b>{message.from}</b> {message.body} </li>
  })
return (
  <div>
  <Header />
  <input type = 'text' placeholder = 'Enter a message' onKeyUp = {this.handleSubmit} />
    {messages}
  </div>

)
}
}
ReactDOM.render(<App />, document.getElementById('root'));
