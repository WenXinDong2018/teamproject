import React , {Component} from 'react';
import RequestPage from "./RequestPage"
import CourierPage from "./CourierPage"
import NotificationsPage from "./NotificationsPage"
import MyOrdersPage from "./MyOrdersPage"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Index from "./Index";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { addComment } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      requests: state.requests,
      deliveries: state.deliveries,
      notifications: state.notifications,
      myorders: state.myorders,
    }
}



const mapDispatchToProps = dispatch => ({
  
  // addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  // resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

});


class Main extends Component {

  constructor(props){
    super(props);
  }

 
  render(){

  return (
    <div>
        <Header />
        <Switch>
            <Route path = "/home" component = {Index} />
            <Route exact path = "/requestPage" component = {() => <RequestPage requests = {this.props.requests} />} />
            <Route path = "/courierPage" component = {() => <CourierPage deliveries = {this.props.deliveries} />} />
            <Route exact path='/notifications' component = {() => <NotificationsPage notifications = {this.props.notifications} />} />
            <Route exact path='/myorders' component = {() => <MyOrdersPage myorders = {this.props.myorders} />} />
            <Redirect to = "/home" />

        </Switch>
        
        <Footer />
      </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));