import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody
} from 'reactstrap'
import {
    GoogleMap,
    Marker,
    LoadScript
} from "@react-google-maps/api"

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete"

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox"

import { Compass } from 'react-feather'

import {Button} from 'reactstrap'

const SearchLocation = () => {
    const [markers, setMarkers] = useState(null)
    const libraries = ["places"]
    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }
    const mapContainerStyle = {
        width: "100%",
        height: "100vh"
    }
    const center = {
        lat: 33.684422,
        lng: 73.047882
    }
    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])
    const panTo = useCallback(({ lat, lng }) => {
        setMarkers(
            {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
        )
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(15)
    }, [])
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>
                    Base Control Location
                </CardTitle>
            </CardHeader>
            <CardBody>
                <div>
                    <div className='gmap-container'>
                        <LoadScript googleMapsApiKey="AIzaSyDxLxPEKkM9vuuAJpTQuWJBCcfLmZKlDmI" libraries={libraries} >
                            <Locate panTo={panTo} />
                            <Search panTo={panTo} />
                            <GoogleMap
                                id="map"
                                mapContainerStyle={mapContainerStyle}
                                zoom={8}
                                center={center}
                                options={options}
                                // onClick={onMapClick}
                                onLoad={onMapLoad}
                            >
                                {markers && (<Marker
                                    position={markers}
                                />)}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                    },
                    () => null
                )
            }}
        >
            <Compass />
        </button>
    )
}

function Search({ panTo }) {
    const saveChanges = (e) => {
    }
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete(/*{
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    }*/)
    const handleInput = (e) => {
        setValue(e.target.value)
    }
    const handleSelect = async (address) => {
        setValue(address, false)
        clearSuggestions()
        try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            
            panTo({ lat, lng })
        } catch (error) {
            // console.log(":scream: Error: ", error)
        }
    }
    return (
        <div className="search">
            <Button className='my-1 backBtn' color='primary' onClick={(e) => {
                saveChanges(e)
            }}>Save Changes</Button>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}
export default SearchLocation















//--------------------------------------------
//--------Zeeshan's map-----------------------
//--------------------------------------------

// import {
//   GoogleMap,
//   Marker,
//   LoadScript,
// } from "@react-google-maps/api";
// import mapStyles from "./MapStyles"

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// import {
//   Combobox,
//   ComboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxInput,
// } from "@reach/combobox";
// import React from "react";


// const libraries=["places"]
// const mapContainerStyle = {
//   width: "100vw",
//   height: "100vh",
// };
// const center = {
//   lat: 33.6844,
//   lng:  73.0479,
// };

// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true,
//   zoomControl: true,
// };
// const Map = () => {
  


//     return (
//       <React.Fragment>
//       <Search/>
//       <div>
//           <LoadScript googleMapsApiKey="AIzaSyDxLxPEKkM9vuuAJpTQuWJBCcfLmZKlDmI"
//       libraries={libraries}
//       >
//         <GoogleMap
//           mapContainerStyle={mapContainerStyle}
//           zoom={12}
//           center={center}
//           options={options}
//         >
//         </GoogleMap>

//       </LoadScript>
         
     
//       </div>
//       </React.Fragment>
//     );
//   };


 

//   function Search(){

//     const {ready,
//         value,
//       suggestions:{status,data},
//       setValue,
//       clearSuggestions

//   }=usePlacesAutocomplete({
//       requestOptions:{
//         location:{ lat:()=> 33.6844,
//           lng:()=>  73.0479,
//           radius:200*1000
//         }
//       }
//     });

//     console.log("ready:",ready)

//     return(
//       <Combobox
//       onSelect={(address)=>console.log(address)}
//       >
//         <ComboboxInput
//         value={value}
//         onChange={(e)=>{
//           setValue(e.target.value)
//         }}
//         disabled={!ready}
//         placeholde="Enter an address"
//         ></ComboboxInput>
//       </Combobox>
//     )
//   }
  
//   export default Map;
  





  


