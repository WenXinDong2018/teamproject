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
import {filterRequests, updateOfferDelivery, fetchUnmatchedRequests, postRequest,fetchMyDeliveries, fetchMyRequests} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {updates} from "../shared/updates"
const mapStateToProps = state => {
    return {
      requests: state.requests.unmatched,
      notifications: state.notifications,
      myrequests: state.requests.myrequests,
      mydeliveries: state.requests.mydeliveries,
      nearbystores: state.nearbystores,

    }
}

const mapDispatchToProps = dispatch => ({
  fetchMyDeliveries : () => dispatch(fetchMyDeliveries()),
  fetchMyRequests : () => dispatch(fetchMyRequests()),
  fetchUnmatchedRequests : () => dispatch(fetchUnmatchedRequests()),
  postRequest: (postInfo, shoppingList) => dispatch(postRequest(postInfo, shoppingList)),
  filterRequests : (filters) => dispatch(filterRequests(filters)),
  updateOfferDelivery : (updates, requestId) => dispatch(updateOfferDelivery(updates, requestId)),
});


class Main extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchUnmatchedRequests();
    this.props.fetchMyDeliveries();
    this.props.fetchMyRequests();
    
  }

 
  render(){
  
  return (
    <div>
        <Header />
        <Switch>
            <Route path = "/home" component = {Index} />
            <Route exact path = "/requestPage" component = {() => <RequestPage requests = {this.props.requests} updates ={updates} nearbystores = {this.props.nearbystores} updateOfferDelivery = {this.props.updateOfferDelivery} filterRequests = {this.props.filterRequests}/>} />
            <Route exact path = "/postARequest" component = {() => <PostARequestPage nearbystores = {this.props.nearbystores} postRequest = {this.props.postRequest}/>} />
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