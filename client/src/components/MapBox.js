import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmV3NzEyNDEiLCJhIjoiY2ttdjl1bTYyMDMycTJybzN1YTQ4a3JtaSJ9.JGkpuBGR2XoiAEuCVSLPvA"; // setup for one user only

export const MapBox = ({ longitude, latitude }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    map.current.setCenter([longitude, latitude]);
  }, [longitude, latitude]);

  return (
    <>
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          height: "25%",
          width: "100%",
          position: "absolute",
          top: "70%",
        }}
      />
    </>
  );
};
