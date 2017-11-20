import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // bindings
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.state = {
      buyItems: [],
      message: ''
    }
  }

  addItem(e) {
    e.preventDefault();
    const { buyItems } = this.state;
    const newItem = this.newItem.value;
    const itemInCart = this.state.buyItems.includes(newItem);
    const itemInCartIndex = this.state.buyItems.indexOf(newItem);

    if(itemInCart) {
      this.setState({ message: newItem + ` exist in cart: ` + `[${itemInCartIndex}]`});
    } else {
      newItem !==  '' && this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: 'Added: ' + newItem + ' to cart.'
      });
    };
    this.refs.form.reset();
  }

  removeItem(item) {
    const newBuyItems = this.state.buyItems.filter(buyItem => {
      return buyItem !== item;
    });
    
    this.setState({
      buyItems: [...newBuyItems],
      message: 'Removed ' + item + ' from shopping cart'
    })
    
    if(newBuyItems.length === 0) {
      this.setState({
        message: "No items. Add some to your cart."
      })
    }
  }

  render() {
    const { buyItems, message } = this.state;

    return (
      <div className="app-container">
          <header>
              <img src="https://cdn.pixabay.com/photo/2016/12/21/16/34/shopping-cart-1923313_1280.png" alt="Shopping cart logo" />
              <h2>Your Shopping Cart</h2>
              <p>You have <span className="todoCount">{buyItems.length}</span> item(s) in cart</p>

              <form className="form" id="form" ref="form" onSubmit={this.addItem}>
                  <div className="form-group">
                      <label className="sr-only" htmlFor="Add New Item">Add New Item</label>
                      <input type="text" placeholder="Bread.." className="form-control" id="newItemInput" 
                      ref={(input) => { this.newItem = input }} required/>
                  </div>
                  <button className="btn btn-primary btn-sm">Add</button>
              </form>
          </header>
          <div className="content">
              <p className="text text-danger">{message}</p>
              <table className="table">
                  <tr>    
                      <td>#</td>
                      <td>Item</td>
                      <td>Action</td>
                  </tr>
                  {
                    buyItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{item}</td>
                          <td><button className="btn btn-danger btn-sm" onClick={(e) => this.removeItem(item)}>Remove</button></td>
                        </tr>
                      )
                    })
                  }
              </table>
          </div>
      </div>
    );
  }
}

export default App;
