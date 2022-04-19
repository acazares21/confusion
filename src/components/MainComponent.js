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

import { addComment, fetchDishes } from '../redux/ActionCreators';

import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    comments: state.comments,
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions,
  }    
}

const mapDispatchToProps = (dispatch) =>({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
})

class Main extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {
    //Render view to stablish through "const" links to different parts of the web
    const HomePage = () => {
      return(
          <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
  };

    const DishWithId = ({match}) =>{
      return(
        <DishDetail 
          dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment}
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
          <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));