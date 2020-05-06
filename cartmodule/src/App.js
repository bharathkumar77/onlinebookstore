import React, { Component } from 'react'
import ShoppingCart from "./components/shoppingcart";
import { Route, Switch, Redirect } from "react-router-dom";
import CheckOutPage from "./components/checkoutpage";
import Success from "./components/successpage";
import Navbar from "./components/navbar";
import HomePage from "./components/homepage";
import Login from "./components/login";
import Register from "./components/register";
import ErrorPage from "./components/404page";
class App extends Component {

  //This will be called from Navbar whenever user clicks logout 
  setLogin = () => {
    this.setState({ isLoggedIn: false })
  }
  state = {
    // Sets to "true" if user is logged in and "false" once user logs out
    isLoggedIn: true
  }

  render() {

    return (<div>
      {/*Routes to all the components using ReactRouterDOM */}

      <Navbar isLoggedIn={this.state.isLoggedIn} setLogin={this.setLogin} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={HomePage} />
        <Route path="/register" exact component={Register} />
        <Route path="/shoppingcart" exact component={ShoppingCart} />
        <Route path="/checkout" exact component={CheckOutPage} />
        <Route path="/success" exact component={Success} />

        {/* If user access any page that's broken or not available, this 404Page will be displayed */}

        <Route component={ErrorPage} />
      </Switch>
    </div>);
  }
}
export default App;