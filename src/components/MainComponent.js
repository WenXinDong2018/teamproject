import React, { Component } from 'react';
import RequestPage from "./RequestPage"
import NotificationsPage from "./NotificationsPage"
import PostARequestPage from "./PostARequestPage"
import MyOrdersPage from "./MyOrdersPage"
import TOSPage from "./TOS"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Index from "./Index";
import MissionPage from "./MissionPage";
import QAPage from "./QA";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchUnmatchedRequestsFirebase,
  fetchUserInfo,
  fetchNotifications,
  fetchUpdates,
  fetchMyDeliveries,
  fetchMyRequests,
} from "../redux/ActionCreatorsFetch";
import {
  setFilters,
  updateOfferDelivery,
  updateNotification,
  postUserInfo,
  logoutUser,
  googleLogin,
  facebookLogin,
  postUpdate,
  postNotification,
  postRequestFirebase,
  sendThankYouNote,
} from "../redux/ActionCreators";
const mapStateToProps = (state) => {
  return {
    requests: state.requests.unmatched,
    notifications: state.notifications,
    myrequests: state.requests.myrequests,
    mydeliveries: state.requests.mydeliveries,
    nearbystores: state.nearbystores,
    updates: state.updates,
    isRequestsLoading: state.requests.isLoading,
    auth: state.auth,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMyDeliveries: () => dispatch(fetchMyDeliveries()),
  fetchMyRequests: () => dispatch(fetchMyRequests()),
  fetchUnmatchedRequests: () => dispatch(fetchUnmatchedRequestsFirebase()),
  fetchUpdates: () => dispatch(fetchUpdates()),
  fetchUserInfo: () => dispatch(fetchUserInfo()),
  fetchNotifications: () => dispatch(fetchNotifications()),
  postNotification: (notification) => dispatch(postNotification(notification)),
  updateNotification: (notificationId) =>
    dispatch(updateNotification(notificationId)),
  postUpdate: (update) => dispatch(postUpdate(update)),
  postUserInfo: (userInfo) => dispatch(postUserInfo(userInfo)),
  postRequest: (postInfo, shoppingList) =>
    dispatch(postRequestFirebase(postInfo, shoppingList)),
  sendThankYouNote: (note, orderId) =>
    dispatch(sendThankYouNote(note, orderId)),
  setFilters: (filters) => dispatch(setFilters(filters)),
  updateOfferDelivery: (updates, requestId) =>
    dispatch(updateOfferDelivery(updates, requestId)),
  logoutUser: () => dispatch(logoutUser()),
  googleLogin: () => dispatch(googleLogin()),
  facebookLogin: () => dispatch(facebookLogin()),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //these functions are called once the user
    //clicks into the website
    

    //user info include name, address, contact info
    //if user is not logged in, do nothing
    this.props.fetchUserInfo();

    //real time updates to show on the side bar
    this.props.fetchUpdates();

    //requests shown on the requests page
    this.props.fetchUnmatchedRequests();
    
    //users requests, deliveries, and notifications to show on 
    //the MyOrders page and Notifications page
    //if user is not logged in, do nothing

    this.props.fetchMyDeliveries();
    this.props.fetchMyRequests();
    this.props.fetchNotifications();
  }

  render() {
    return (
      <div>
        <Header
          auth={this.props.auth}
          logoutUser={this.props.logoutUser}
          googleLogin={this.props.googleLogin}
          facebookLogin={this.props.facebookLogin}
        />
        <Switch>
          <Route
            path="/home"
            component={() => <Index updates={this.props.updates} />}
          />
          <Route exact path="/mission" component={MissionPage} />
          <Route exact path="/faq" component={QAPage} />
          <Route exact path="/TOS" component={TOSPage} />
          <Route exact path="/requestPage" component={() =>
            <RequestPage
              filters={this.props.filters}
              postUserInfo={this.props.postUserInfo}
              auth={this.props.auth}
              googleLogin={this.props.googleLogin}
              facebookLogin={this.props.facebookLogin}
              isRequestsLoading={this.props.isRequestsLoading}
              postNotification={this.props.postNotification}
              requests={this.props.requests}
              updates={this.props.updates}
              nearbystores={this.props.nearbystores}
              updateOfferDelivery={this.props.updateOfferDelivery}
              setFilters={this.props.setFilters}
              postUpdate={this.props.postUpdate}
              postNotification={this.props.postNotification}
            />}
          />

          <Route
            exact
            path="/postARequest"
            component={() => (
              <PostARequestPage
                postUserInfo={this.props.postUserInfo}
                postNotification={this.props.postNotification}
                nearbystores={this.props.nearbystores}
                postRequest={this.props.postRequest}
                auth={this.props.auth}
                googleLogin={this.props.googleLogin}
                facebookLogin={this.props.facebookLogin}
              />
            )}
          />
          <Route
            exact
            path="/notifications"
            component={() => (
              <NotificationsPage
                updateNotification={this.props.updateNotification}
                myRequests={this.props.myrequests}
                myDeliveries={this.props.mydeliveries}
                notifications={this.props.notifications}
              />
            )}
          />
          <Route
            exact
            path="/myorders"
            component={() => (
              <MyOrdersPage
                myrequests={this.props.myrequests}
                mydeliveries={this.props.mydeliveries}
                postUpdate={this.props.postUpdate}
                sendThankYouNote={this.props.sendThankYouNote}
              />
            )}
          />
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
