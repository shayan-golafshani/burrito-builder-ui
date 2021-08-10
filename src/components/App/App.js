import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import { postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => {
      console.log(data.orders)
      this.setState({orders: data.orders})
    })
      .catch(err => console.error('Error fetching:', err));
  }


  addOrder = (newOrder) => {
    postOrder("http://localhost:3001/api/v1/orders", newOrder)
      .then(result => {
        if (result.id) {
          this.setState({ orders: [...this.state.orders, result], error: '' })
        } else {
          this.setState({ error: 'Please send a valid order!' })
        }
      }).catch(err =>  console.error("This is your error from post", err))
  }

  // postOrder("http://localhost:3001/api/v1/orders", data)
  //     .then(res => console.log("This is your response from post", res))
  //     .catch(err =>  console.error("This is your error from post", err))


  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
