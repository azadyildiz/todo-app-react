import React from 'react';
import './App.css';
import Form from "./components/Form"
import List from "./components/List";

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [{ id: 0, body: " Learn React ❤️", isDone: false }]
    }
  }

  addItems = (item) => {
    this.setState({
      items: [...this.state.items, item],
    })
  }
  clearItems = () => {
    this.setState({ items: [] })
  }

  render() {
    return (
      <div className='container'>
        <div className='todo-container'>
          <Form addItems={this.addItems} />
          <List data={this.state.items} />
          <div className='footer'>
            <button onClick={() => { this.clearItems() }}>Clear All</button>
          </div>
        </div>
      </div >
    )
  }
}