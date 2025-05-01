import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder';


// Fix for default marker icon not displaying
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([20.5937, 78.9629]); // Center of India

  useEffect(() => {
    ELG.geocode().text(address).run((err, results) => {
      if (results?.results?.length > 0) {
        const { lat, lng } = results.results[0].latlng;
        setPosition([lat, lng]);
        map.flyTo([lat, lng], 6);
      }
    });
  }, [address]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup/>
    </Marker>
  );
};

export default GeoCoderMarker;
