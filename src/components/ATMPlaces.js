import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import HomeBankingService from '../api/home-banking/HomeBankingService'
const { REACT_APP_GOOGLE_MAP_KEY } = process.env;

const containerStyle = {
  width: '100%',
  height: '100vh'
};
const ATMPlaces = forwardRef((props, ref) => {
  const [ currentPosition, setCurrentPosition ] = useState({ lat: 52.132633,lng: 5.291266});
  const [markers, setMarkers] = React.useState([])
  const [selectedATM, setSelectedATM] = React.useState(null)
  useEffect(() => {
    HomeBankingService.retrieveATM()
    .then( response => {
      setMarkers(response.data.map(a=> {
        return { position: {lat: a.address.geoLocation.lat,
        lng: a.address.geoLocation.lng},
        street: a.address.street,
        city: a.address.city,
        postalcode: a.address.postalcode
        }
      }));
    })
    
  });
  
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(success);
  };
 
  useImperativeHandle(ref, () => {
    return {
      getCurrentPosition: getCurrentPosition
    };
  });

  return (
    <LoadScript
      googleMapsApiKey={REACT_APP_GOOGLE_MAP_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={8}
      >
{
      markers.map( (atm,idx) => {
      return <Marker 
        key={idx}
        position= {atm.position}
        onClick= {()=> {
          setSelectedATM(atm)
        }}

        />
      })
    }
    {
      selectedATM && (
        <InfoWindow
        position={selectedATM.position}
        onCloseClick={()=>{
          setSelectedATM(null)
        }}
        >
          <div>
            <p>Street : {selectedATM.street}</p>
            <p>City : {selectedATM.city}</p>
            <p>Postal Code : {selectedATM.postalcode}</p>
          </div>
        </InfoWindow>
      )
    }

    } 
      </GoogleMap>
    </LoadScript>
  )
});
export default ATMPlaces