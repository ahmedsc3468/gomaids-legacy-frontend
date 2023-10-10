import {
  GoogleMap,
  Marker,
  LoadScript,

} from "@react-google-maps/api";

import React, { useEffect, useState, useRef, useCallback } from 'react'

import compass from "../../../Images/compass.png"

import usePlacesAutocomplete, {
  getGeocode,

  getLatLng,
} from "use-places-autocomplete";

import {
  geocodeByAddress,

} from 'react-places-autocomplete';

import {
  Combobox,
  ComboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxInput,
} from "@reach/combobox";
import path from "path";


const libraries = ["places"]

const Address = ({ page }) => {
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyDxLxPEKkM9vuuAJpTQuWJBCcfLmZKlDmI"
      libraries={libraries}
    >
      <Search page={page} />
    </LoadScript>
  )
}
export default Address;



function Search({ page }) {

  const { ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions

  } = usePlacesAutocomplete(
    {
      requestOptions: {
        componentRestrictions: { country: ['ca'] },
     
      }
    }
  );
  const showSuggestions = React.useRef(false);
  useEffect(() => {
    const address = localStorage.getItem("address")
    if (address)
      setValue(address)

  }, [])
  const handleSelect = async (address) => {

    if (!page) {
      setValue(address, false);

      localStorage.setItem("address", address)
    }
    clearSuggestions();


    if (!page) {
      const results = await geocodeByAddress(address)

      const city = results[0].address_components.filter(x => x.types[0] === "locality")
      const state = results[0].address_components.filter(x => x.types[0] === "administrative_area_level_1")
      const country = results[0].address_components.filter(x => x.types[0] === "country")
      const postal_code = results[0].address_components.filter(x => x.types[0] === "postal_code")

      localStorage.setItem("city", city[0].long_name)
      localStorage.setItem("state", state[0].long_name)
      localStorage.setItem("country", country[0].long_name)
      localStorage.setItem("postal_code", postal_code[0].long_name)

    }
    else {
      if (page === "setUpWizard streetAddress") {
        const results = await geocodeByAddress(address)
        const city = results[0].address_components.filter(x => x.types[0] === "locality")
        const state = results[0].address_components.filter(x => x.types[0] === "administrative_area_level_1")
        const country = results[0].address_components.filter(x => x.types[0] === "country")
        const postal_code = results[0].address_components.filter(x => x.types[0] === "postal_code")
        if (city[0] && state[0] && country[0]&& postal_code[0]) 
        // if (city[0] && state[0] && country[0]) 
        {
          localStorage.setItem("city", city[0].long_name)
          localStorage.setItem("state", state[0].long_name)
          localStorage.setItem("country", country[0].long_name)
          localStorage.setItem("postal_code", postal_code[0].long_name)
          localStorage.setItem("streetAddress", address)
          setValue(address, false)
          showSuggestions.current = false
        }
      }
      else if (page === "userProfile updateAddress") {
        const results = await geocodeByAddress(address)
        const city = results[0].address_components.filter(x => x.types[0] === "locality")
        const state = results[0].address_components.filter(x => x.types[0] === "administrative_area_level_1")
        const country = results[0].address_components.filter(x => x.types[0] === "country")
        // const postal_code = results[0].address_components.filter(x => x.types[0] === "postal_code")
        // if (city[0] && state[0] && country[0]&& postal_code[0]) 
        if (city[0] && state[0] && country[0]) 
        {
          localStorage.setItem("city", city[0].long_name)
          localStorage.setItem("state", state[0].long_name)
          localStorage.setItem("country", country[0].long_name)
          // localStorage.setItem("postal_code", postal_code[0].long_name)
          localStorage.setItem("updateAddress", address)
          setValue(address, false)
          showSuggestions.current = false
        }
      }
      else if (page === "setUpWizard defaultAddress") {
        localStorage.setItem("defaultAddress", address)
        setValue(address, false)
        showSuggestions.current = false
      }
    }
  }


  return (
    <Combobox
      onSelect={(address) => { handleSelect(address) }}
    >

      <div className="address-order-txt">
        <ComboboxInput
          value={value}
          onChange={(e) => {

            if (page === "setUpWizard streetAddress") {

              localStorage.setItem("streetAddress", e.target.value)
              setValue(e.target.value)
              showSuggestions.current = true

            }
            else if (page === "userProfile updateAddress") {

              localStorage.setItem("updateAddress", e.target.value)
              setValue(e.target.value)
              showSuggestions.current = true

            }

            else if (page === "setUpWizard defaultAddress") {
              console.log("defaultAddress")
              localStorage.setItem("defaultAddress", e.target.value)
              setValue(e.target.value)
              showSuggestions.current = true
            }

            else {
              localStorage.removeItem("city")
              localStorage.removeItem("state")
              localStorage.removeItem("country")
              localStorage.removeItem("postal_code")
              setValue(e.target.value)
              showSuggestions.current = true
              if (!e.target.value) {

                localStorage.removeItem("address")
              }
              localStorage.setItem("address", e.target.value)
            }
          }
        }
          disabled={!ready}
          placeholder="Enter your service address"
        ></ComboboxInput>
      </div>

      <ComboboxPopover
        className="popover-style"
      >
        {showSuggestions.current && <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }, i) => (
              <ComboboxOption key={i} value={description}
                className="popover-option"
              />
            ))}
        </ComboboxList>}
      </ComboboxPopover>
    </Combobox>
  )
}