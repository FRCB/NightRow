import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Map, { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Contents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
      position: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClicked = this.onMapClicked(this)

  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({
        place: place,
        position: place.geometry.location
      })
    })

  }

  render() {
    const props = this.props;
    const { position } = this.state;

    let mappedMarkers = this.props.events.map((location, i) => {
      return (
        <Marker
          key={i}
          onClick={this.onMarkerClick}
          name={location.event_title}
          position={{ lat: location.event_lat, lng: location.event_lng }}
        />
      )
    })

    return (
      <div className='map-block'>
        <div>
          <form>
            <input
              style={{ fontSize: 11 }}
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              type='submit'
              style={{ fontFamily: 'Orbitron', color: 'grey' }}
              value='Go' />
          </form>
          {/* <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div> */}
        </div>
        <div >
          <Map {...props}
            containerStyle={{
              position: 'relative',
              height: '50vh',
              width: '100%'
            }}
            center={this.state.position}
            centerAroundCurrentLocation={false}
            initialCenter={{
              lat: 38.9071923,
              lng: -77.03687070000001
            }}
            zoom={12}
            onClick={this.onMapClicked}
          >
            {mappedMarkers}
            <Marker position={this.state.position} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div >
    )
  }
}

class MapWrapper extends Component {
  render() {
    const props = this.props;
    const { google } = this.props;

    return (
      <Map google={google}
        visible={false}>
        <Contents {...props} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapWrapper)