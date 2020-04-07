import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import {   withScriptjs,
    withGoogleMap,
    GoogleMap,
    StreetViewPanorama,
    OverlayView, Marker, Map, GoogleApiWrapper, TrafficLayer
   } from 'google-maps-react';
import { compose, withProps } from "recompose";
// const FaAnchor = require("react-icons/lib/fa/anchor");
// import {FaAnchor} from "react-icons/lib/fa";

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})


class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
        <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        {this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
      </GoogleMap>
    );
        }
    
}
 

 export default Home;
  
