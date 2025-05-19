import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import mapStyles from './MapStyles';
import React, { useEffect, useState, useRef, useCallback } from 'react';

import compass from '../../../Images/compass.png';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxInput,
} from '@reach/combobox';
import path from 'path';

const Map = () => {
  const libraries = ['places'];
  const [marker, setMarker] = useState([]);

  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };
  const center = {
    lat: 33.6844,
    lng: 73.0479,
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const onMapClick = React.useCallback((event) => {
    let arr = [];
    arr.push({
      lat: Number(event.latLng.lat()),
      lng: Number(event.latLng.lng()),
    });

    localStorage.setItem('lat', Number(event.latLng.lat()));
    localStorage.setItem('lng', Number(event.latLng.lng()));
    setMarker(arr);
  }, []);

  return (
    <React.Fragment>
      <div>
        {/* {console.log("pathname resolve:",path.resolve(__dirname,"src"))} */}
        <LoadScript
          googleMapsApiKey='AIzaSyCDNkZ-OdVb0rc-rJImSM9fZ1oONuoih4o'
          libraries={libraries}
        >
          <Search panTo={panTo} />
          <Locate panTo={panTo} />
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
            onLoad={onMapLoad}
            onClick={onMapClick}
          >
            {marker.length > 0 && (
              <Marker
                position={{ lat: marker[0].lat, lng: marker[0].lng }}
                icon={{
                  // url:`${path.resolve(__dirname,"src")}/assets/pin.png`,
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </React.Fragment>
  );
};

function Locate({ panTo }) {
  const locateUser = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  };
  return (
    <button className='locate'>
      <img
        style={{ height: '4rem', width: '4rem' }}
        src={compass}
        alt='compass - locate me'
        onClick={locateUser}
      />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  //   {
  //   requestOptions:{
  //     location:{ lat:()=> 33.6844,
  //       lng:()=>  73.0479,
  //       radius:200*1000
  //     }
  //   }
  // }

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {}
  };

  return (
    <Combobox
      onSelect={(address) => {
        handleSelect(address);
      }}
    >
      <div className='search'>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter an address'
        ></ComboboxInput>
      </div>

      <ComboboxPopover className='popover-style'>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ id, description }, i) => (
              <ComboboxOption
                key={i}
                value={description}
                className='popover-option'
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default Map;
