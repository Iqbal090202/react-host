import React, {Component} from 'react';

class Api extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoading: true
    }
  }

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => this.setState({ items: data, isLoading: false }))
  }

  render() {
    const { items, isLoading } = this.state

    if(isLoading) {
      return <h1>Loading......</h1>
    }

    return (
      <div>
        <ul>
          { items.map((item, index) => <li key={index}> {item.name} </li>) }
          { items.map((item, index) => <li key={index}> {item.email} </li>) }
        </ul>
      </div>
    )
  }
  
}

export default Api;
