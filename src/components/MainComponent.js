import React, { Component } from 'react';

import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';

import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponents';
import Footer from './FooterComponent'
import About from './AboutComponent';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    comments: state.comments,
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
  }    
}

class Main extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    //Render view to stablish through "const" links to different parts of the web
    const HomePage = () => {
      return(
          <Home 
            dish={ this.props.dishes.filter( (dish)=>dish.featured )[0] }
            promotion={this.props.promotions.filter( (promotion)=>promotion.featured )[0] }
            leader={this.props.leaders.filter( (leader)=>leader.featured )[0] }
          />
      );
  };

    const DishWithId = ({match}) =>{
      return(
        <DishDetail  
          dish={this.props.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId, 10))[0] } 
          comments={this.props.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId, 10)) } 
        />
      );
    }

    const AboutUsPage = () => {
      return(
        <About 
          leaders={this.props.leaders}
        />
    );
  };

    return (
      <div>
        <Header />
        {/*Links to differents parts of the web application*/}
        <Switch>
          <Route path="/Home" component={HomePage}/>
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/> }/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/aboutus" component={AboutUsPage} />
          {/*By default it redirects to Home*/}
          <Redirect to ="/home"/>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));