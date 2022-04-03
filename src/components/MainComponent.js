import React, { Component } from 'react';
import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponents';
import Footer from './FooterComponent'
import { DISHES } from '../shared/dishes';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }

  render() {

    const HomePage = () =>{
      return(
        <Home/>
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/Home" component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>}/>
          <Redirect to ="/home"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;