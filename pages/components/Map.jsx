import React from 'react'
import GoogleMapReact from 'google-map-react'

const Map = ({ coordinates, setCoordinates }) => {
  return (
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.MAP_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={()=> {  }}
        onChildClick={() => {}}
      >

      </GoogleMapReact>
    </div>
  );
}

export default Map;