import React from 'react/addons';
import _ from 'lodash';
import { GoogleMaps, Marker } from 'react-google-maps';

class ApartmentMap extends React.Component {

  state = {
    geo: this.props.selectedCity.geo
  }

  handleMapMove () {
    return requestAnimationFrame(() => {
      let center = this.refs.map.getCenter();
      let zoom = this.refs.map.getZoom();
      this.setState({
        geo: {
          center: center,
          zoom: zoom
        }
      });
    });
  }

  componentWillReceiveProps (nextProps) {

    if (this.props.selectedCity !== nextProps.selectedCity) {
      this.setState({
        geo: nextProps.selectedCity.geo
      });
    }
  }

  render () {
    let geo = this.state.geo;
    let markers = _(this.props.apartments)
      .map((marker, index) => {

        return (
          <Marker
            position={ marker.geo }
            key={ marker.index }
          />
        );
      }).value();

    return (
      <GoogleMaps containerProps={{
          style: {
            height: '100%'
          }
        }}
        ref="map"
        googleMapsApi={ window.google.maps || null }
        disableDefaultUI={ true }
        backgroundColor="#ECEFF1"
        zoom={ geo.zoom }
        center={ geo.center }
        onIdle={this.handleMapMove.bind(this)}
      >
        { markers }
      </GoogleMaps>
    );
  }
}

export default ApartmentMap;
