import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline'
import {getCookie} from '../components/cookieHelper'

let userAccessToken = getCookie('access_token')

let latLngCircleSize = 20
let latLngCircleOpacity = 0.5

if(userAccessToken) {
  latLngCircleSize = 4
  latLngCircleOpacity = 1
} else {
  latLngCircleSize = 50
  latLngCircleOpacity = 0
}


class MapboxMap extends Component {

  componentDidMount() {

    let polylinePath = "vsf`Fw}hi`@H{ArNi@]yO{IHUdHiLZgA`CqQ^eOuCsGhEq~@{~@}IyLuAePeJq`@mZqg@yCiMsEoH_Cg[qJwi@kMaOiHmb@mHsLcAqJkCoD{RiE{V}Lat@kz@uC_AmRpK}AjOgGmAyF~\zEbDkB~MlJ|Gy@rChBvDkAxFqF}Ac@fBc@mB"

    let decodedPolyline = polyline.toGeoJSON(this.props.mapPolyline)
    let decodedPolylineArray = decodedPolyline.coordinates
    let startLatlng = this.props.startLatlng
    let endLatlng = this.props.endLatlng

    mapboxgl.accessToken = 'pk.eyJ1IjoicDBwbWFrZXIiLCJhIjoiY2lzOXliOGlrMDA2ODJ5bzJ4YjNnb29qdSJ9.hf19Sca7oYCcR8kRlx07Rw';

    const map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [
        startLatlng[1], startLatlng[0]
      ],
      zoom: 12
    })

    console.log(decodedPolylineArray);

    map.on('load', function() {

      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": decodedPolylineArray
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#0a67f2",
          "line-width": 1
        }
      });

      map.addLayer({
        "id": "start",
        "type": "circle",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {
              "description": "Activity Start"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [startLatlng[1], startLatlng[0]]
            }
          }
        },
        "paint": {
          "circle-color": "#41c15a",
          "circle-radius": latLngCircleSize,
          "circle-opacity": latLngCircleOpacity
        }
      });

      map.addLayer({
        "id": "end",
        "type": "circle",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {
              "description": "Activitiy End"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [endLatlng[1], endLatlng[0]]
            }
          }
        },
        "paint": {
          "circle-color": "#f03434",
          "circle-radius": latLngCircleSize,
          "circle-opacity": latLngCircleOpacity
        }
      });

      // Geographic coordinates of the LineString
      var coordinates = decodedPolylineArray;

      // Pass the first coordinates in the LineString to `lngLatBounds` &
      // wrap each coordinate pair in `extend` to include them in the bounds
      // result. A variation of this technique could be applied to zooming
      // to the bounds of multiple Points or Polygon geomteries - it just
      // requires wrapping all the coordinates with the extend method.
      var bounds = coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      map.fitBounds(bounds, {padding: 80});

      map.addControl(new mapboxgl.NavigationControl())
      // map.addControl(new mapboxgl.FullscreenControl());
      map.scrollZoom.disable();

      // Create a popup, but don't add it to the map yet.
      let popup = new mapboxgl.Popup({closeButton: false, closeOnClick: false});

      map.on('mouseenter', 'start', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates).setHTML(e.features[0].properties.description).addTo(map);
      });

      map.on('mouseleave', 'start', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      map.on('mouseenter', 'end', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates).setHTML(e.features[0].properties.description).addTo(map);
      });

      map.on('mouseleave', 'end', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

    });
  }

  render() {
    return (
      <div className='c-activity-interactive-map-container'>
        <div className='c-activity-interactive-map' ref={(x) => {
          this.container = x
        }}></div>
      </div>
    )
  }
}

export default MapboxMap
