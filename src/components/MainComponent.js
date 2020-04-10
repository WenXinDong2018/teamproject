import React , {Component} from 'react';
import RequestPage from "./RequestPage"
import CourierPage from "./CourierPage"
import NotificationsPage from "./NotificationsPage"
import MyOrdersPage from "./MyOrdersPage"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ContactInfoPage from './ContactInfoPage';
import Index from "./Index";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { addComment , addDeliveryPost, addRequestPost} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import PostARequestPage from './PostARequestPage';
import PostADeliveryPage from "./PostADeliveryPage"

const mapStateToProps = state => {
    return {
      requests: state.requests,
      deliveries: state.deliveries,
      notifications: state.notifications,
      myorders: state.myorders,
      nearbystores: state.nearbystores,
    }
}



const mapDispatchToProps = dispatch => ({
  addRequestPost: (userID, date, store, typeErrand, shoppingList) => dispatch(addRequestPost(userID, date, store, typeErrand, shoppingList)),
  addDeliveryPost: (userID, date, store, typeErrand) => dispatch(addDeliveryPost(userID, date, store, typeErrand)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

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
            <Route path = "/contactInfo" component = {() => <ContactInfoPage resetFeedbackForm = {this.props.resetFeedbackForm }/> } />
            <Route exact path = "/requestPage" component = {() => <RequestPage requests = {this.props.requests} />} />
            <Route exact path = "/postARequest" component = {() => <PostARequestPage nearbystores = {this.props.nearbystores} addRequestPost = {this.props.addRequestPost}/>} />
            <Route exact path = "/postADelivery" component = {() => <PostADeliveryPage  nearbystores = {this.props.nearbystores}  addDeliveryPost = {this.props.addDeliveryPost} />} />
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