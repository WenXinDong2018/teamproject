import React, { Component } from 'react';
import RequestPage from "./RequestPage"
import NotificationsPage from "./NotificationsPage"
import PostARequestPage from "./PostARequestPage"
import MyOrdersPage from "./MyOrdersPage"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Index from "./Index";
import MissionPage from "./Mission";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  filterRequests, updateOfferDelivery, fetchUnmatchedRequests, fetchNotifications,
  fetchUpdates, postRequest, fetchMyDeliveries, fetchMyRequests, postUpdate, postNotification
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { updates } from "../shared/updates"
const mapStateToProps = state => {
  return {
    requests: state.requests.unmatched,
    notifications: state.notifications,
    myrequests: state.requests.myrequests,
    mydeliveries: state.requests.mydeliveries,
    nearbystores: state.nearbystores,
    updates: state.updates,

  }
}

const mapDispatchToProps = dispatch => ({
  fetchMyDeliveries: () => dispatch(fetchMyDeliveries()),
  fetchMyRequests: () => dispatch(fetchMyRequests()),
  fetchUnmatchedRequests: () => dispatch(fetchUnmatchedRequests()),
  fetchUpdates: () => dispatch(fetchUpdates()),
  fetchNotifications: () => dispatch(fetchNotifications()),
  postNotification: (notification) => dispatch(postNotification(notification)),
  postUpdate: (update) => dispatch(postUpdate(update)),
  postRequest: (postInfo, shoppingList) => dispatch(postRequest(postInfo, shoppingList)),
  filterRequests: (filters) => dispatch(filterRequests(filters)),
  updateOfferDelivery: (updates, requestId) => dispatch(updateOfferDelivery(updates, requestId)),
});


class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUnmatchedRequests();
    this.props.fetchMyDeliveries();
    this.props.fetchMyRequests();
    this.props.fetchUpdates();
    this.props.fetchNotifications();

    // this.timer = setInterval(() => {
    //   // this.props.fetchUnmatchedRequests();
    //   // this.props.fetchMyDeliveries();
    //   // this.props.fetchMyRequests();
    //   this.props.fetchUpdates();
    //   this.props.fetchNotifications();
    // }, 5000);

   
  }


  render() {

    return (
      <div>
        <Header />
        <Switch>
        <Route path="/mission" component={MissionPage} />
          <Route path="/home" component={Index} />
          <Route exact path="/requestPage" component={() =>

            <RequestPage 
              postNotification={this.props.postNotification}
              requests={this.props.requests}
              updates={this.props.updates}
              nearbystores={this.props.nearbystores}
              updateOfferDelivery={this.props.updateOfferDelivery}
              filterRequests={this.props.filterRequests}
              postUpdate={this.props.postUpdate} 
              postNotification={this.props.postNotification}
              fetchUpdates = {this.props.fetchUpdates}
              fetchUnmatchedRequests = {this.props.fetchUnmatchedRequests}
/>}
          />

          <Route exact path="/postARequest" component={() => <PostARequestPage postNotification={this.props.postNotification} nearbystores={this.props.nearbystores} postRequest={this.props.postRequest} />} />
          <Route exact path='/notifications' component={() => <NotificationsPage notifications={this.props.notifications}  fetchNotifications = {this.props.fetchNotifications}/>} />
          <Route exact path='/myorders' component={() => <MyOrdersPage 
          myrequests={this.props.myrequests} 
          mydeliveries={this.props.mydeliveries} 
          postUpdate={this.props.postUpdate}  
          fetchMyDeliveries = {this.props.fetchMyDeliveries}
          fetchMyRequests = {this.props.fetchMyRequests}
          />} />
          <Redirect to="/home" />


        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));