import React, { Component } from 'react';

import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';

import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponents';
import Footer from './FooterComponent'
import About from './AboutComponent';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS,
    };
  }

  render() {
    //Render view to stablish through "const" links to different parts of the web
    const HomePage = () => {
      return(
          <Home 
              dish={ this.state.dishes.filter( (dish)=>dish.featured )[0] }
              promotion={this.state.promotions.filter( (promotion)=>promotion.featured )[0] }
              leader={this.state.leaders.filter( (leader)=>leader.featured )[0] }
          />
      );
  };

    const DishWithId = ({match}) =>{
      return(
        <DishDetail  
          dish={this.state.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId, 10))[0] } 
          comments={this.state.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId, 10)) }     
        />
      );
    }

    const AboutUsPage = () => {
      return(
          <About 
              leaders={this.state.leaders}
          />
      );
  };

    return (
      <div>
        <Header />
        {/*Links to differents parts of the web application*/}
        <Switch>
          <Route path="/Home" component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="menu/:dishId" component={DishWithId}/>
          <Route exact path="/aboutus" component={AboutUsPage} />
          {/*By default it redirects to Home*/}
          <Redirect to ="/home"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;