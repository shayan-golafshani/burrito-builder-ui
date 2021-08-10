import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleIngredientChange = e => {
    e.preventDefault();

    console.log(e.target.name, "THIS IS THE CLICK EVENT, I NEED TO GET THE VALUE AND UPDATE THE INGREDIENTS LIST")

    if(!this.state.ingredients.includes(e.target.name)) {
      this.setState({
        ingredients: [...this.state.ingredients, e.target.name]
      }, () => {
        console.log(this.state.ingredients);
      });
    } else {
      console.log("SORRY YOU'VE ALREADY ADDED THAT INGREDIENT")
    }

  }

  handleNameChange = e => {
    e.preventDefault()
    console.log('This is the event!', e)
    this.setState({
      name: e.target.value
    }, () => {
      console.log(this.state.name);
    });
  }

  //this.setState({name: e.target.value})

  handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <button onClick={
          e => {
            e.preventDefault()
            this.setState({ingredients:[]})
          }
        }>Clear Order</button>

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
