import React , {Component} from 'react';
import RequestPage from "./RequestPage"
import NotificationsPage from "./NotificationsPage"
import PostARequestPage from "./PostARequestPage"
import MyOrdersPage from "./MyOrdersPage"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Index from "./Index";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addRequestPost, filterRequests, offerToDeliver} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import OfferDeliveryPage from './OfferDeliveryPage';
import {updates} from "../shared/updates"
const mapStateToProps = state => {
    return {
      requests: state.requests,
      notifications: state.notifications,
      myrequests: state.requests,
      mydeliveries: state.requests,
      nearbystores: state.nearbystores,
    }
}



const mapDispatchToProps = dispatch => ({
  addRequestPost: (postInfo, shoppingList) => dispatch(addRequestPost(postInfo, shoppingList)),
  filterRequests : (filters) => dispatch(filterRequests(filters)),
  offerToDeliver : (requestId, date, phone) => dispatch(offerToDeliver(requestId, date, phone)),
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
            <Route exact path = "/requestPage" component = {() => <RequestPage requests = {this.props.requests} updates ={updates} nearbystores = {this.props.nearbystores} filterRequests = {this.props.filterRequests}/>} />
            <Route exact path = "/postARequest" component = {() => <PostARequestPage nearbystores = {this.props.nearbystores} addRequestPost = {this.props.addRequestPost}/>} />
            <Route exact path = "/offerDelivery/:requestId" component = {() => <OfferDeliveryPage  nearbystores = {this.props.nearbystores}  offerToDeliver = {this.props.offerToDeliver} />} />
            <Route exact path='/notifications' component = {() => <NotificationsPage notifications = {this.props.notifications} />} />
            <Route exact path='/myorders' component = {() => <MyOrdersPage myrequests = {this.props.myrequests} mydeliveries = {this.props.mydeliveries} />} />
            <Redirect to = "/home" />


        </Switch>
        
        <Footer />
      </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));