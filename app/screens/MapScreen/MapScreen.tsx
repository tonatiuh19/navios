import React, { useRef, useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapScreenStyles } from "./MapScreen.style";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import ButtonsControls from "./ZoomControls/ButtonsControls";

const locations = [
  {
    id: 1,
    latitude: 25.583386113924508,
    longitude: -109.06555962561359,
    title: "Industrial Boat",
    description: "This is an industrial/commercial boat port",
    type: "industrial",
  },
  {
    id: 2,
    latitude: 25.599280834450745,
    longitude: -109.05835576828655,
    title: "Touristic Boat",
    description: "This is a touristic boat",
    type: "touristic",
  },
  {
    id: 3,
    latitude: 25.595495103131913,
    longitude: -109.05574842577126,
    title: "Another Boat",
    description: "This is another boat",
    type: "touristic",
  },
  {
    id: 4,
    latitude: 25.590495103131913,
    longitude: -109.05574842577126,
    title: "Another Boat",
    description: "This is another boat",
    type: "industrial",
  },
  {
    id: 5,
    latitude: 25.592745619619073,
    longitude: -109.05775533256534,
    title: "Another Boat",
    description: "This is another boat",
    type: "touristic",
  },
];

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 25.58627632413783,
    longitude: -109.06027458994723,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0221,
  });

  const [filteredLocations, setFilteredLocations] = useState(locations);

  useEffect(() => {
    // Automatically adjust the map to fit all markers
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        locations.map((location) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Add padding around the markers
          animated: true, // Smooth animation
        }
      );
    }
  }, []);

  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500); // Smooth animation
  };

  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500); // Smooth animation
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "industrial":
        return <FontAwesome5 name="ship" size={24} color="#FF6347" />;
      case "touristic":
        return <FontAwesome6 name="sailboat" size={24} color="#1E90FF" />;
      default:
        return <FontAwesome5 name="map-marker-alt" size={24} color="#000" />;
    }
  };

  const handleFilterChange = (filter: string) => {
    if (filter === "all") {
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(
        locations.filter((location) => location.type === filter)
      );
    }
  };

  return (
    <View style={MapScreenStyles.container}>
      <MapView ref={mapRef} style={MapScreenStyles.map} initialRegion={region}>
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
          >
            {getMarkerIcon(location.type)}
          </Marker>
        ))}
      </MapView>
      <ButtonsControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFilterChange={handleFilterChange}
      />
    </View>
  );
};

export default MapScreen;
