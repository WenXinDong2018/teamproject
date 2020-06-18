import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";

//const google = window.google
export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.mymap = React.createRef();
    }
    componentDidMount() {
      if(this.props.auth.position){
        this.mymap.current.map.setCenter({"lat":this.props.auth.position.lat, "lng": this.props.auth.position.lng});  
      }else{
        this.mymap.current.map.setCenter({"lat":37.7749, "lng": -122.4194});  
      }
    }
   
      displayMarkers  = () =>  {
         return this.props.requests.map((request) => { 
           // console.log("checking!", request.position);
            return <Marker position={{
              lat: request.position.lat,
              lng: request.position.lng,
            }} />
      })
    }

      render() {
        return (
        <>
          <Map
           google={this.props.google}
           zoom={8}
           maxZoom={10}
           style={{'border':'0', 'box-sizing': 'initial', 'overflow-x':'hidden', 
           'display': 'block','margin': 'auto',  'width': '1100px', 'position':'relative','height':'550px',}}
           initialCenter={{ lat: 37.7749 , lng:-122.4194}}
           ref={this.mymap}
          >
           {this.displayMarkers()}

          </Map>
        </>
        );
      }
    }


export default GoogleApiWrapper({
    apiKey:''
  })(MapContainer);