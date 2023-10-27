import React, { useEffect, useRef } from 'react';

const MapLocationPicker = ({ onPlaceSelected, change }) => {
  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      options,
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      change(place);
    });
    return () => {
      // Cleanup event listener on component unmount
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [ change ]);

  return (
    <input
        ref={autocompleteInputRef}
        type="text"
        className="form-control mb-3"
        placeholder="Enter a location"
    />
  );
};

const MapLocation = React.memo(MapLocationPicker);

export default MapLocation;