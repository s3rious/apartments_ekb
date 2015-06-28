import React from 'react/addons';
import _ from 'lodash';
import { GoogleMaps, Marker } from 'react-google-maps';

class ApartmentMap extends React.Component {

  render () {
    let geo = this.props.selectedCity.geo;
    let markers = _(this.props.apartments).map((marker, index) => {

      return (
        <Marker
          position={ marker.address.geo }
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
        googleMapsApi={ window.google.maps || null }
        zoom={ geo.zoom }
        center={ geo.center }
      >
        { markers }
      </GoogleMaps>
    );
  }
}

export default ApartmentMap;
