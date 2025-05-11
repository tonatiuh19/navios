import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapScreenStyles } from "./MapScreen.style";
import ButtonsControls from "./ZoomControls/ButtonsControls";
import ReservationButton from "./ReservationButton/ReservationButton";
import { useTranslation } from "react-i18next";

const locations = [
  {
    id: 1,
    latitude: 25.583386113924508,
    longitude: -109.06555962561359,
    title: "Industrial Boat",
    description: "This is an industrial/commercial boat port",
    type: "industrial",
    price: "$500",
  },
  {
    id: 2,
    latitude: 25.599280834450745,
    longitude: -109.05835576828655,
    title: "Touristic Boat",
    description: "This is a touristic boat",
    type: "touristic",
    price: "$300",
  },
  {
    id: 3,
    latitude: 25.595495103131913,
    longitude: -109.05574842577126,
    title: "Another Boat",
    description: "This is another boat",
    type: "touristic",
    price: "$400",
  },
  {
    id: 4,
    latitude: 25.590495103131913,
    longitude: -109.05574842577126,
    title: "Another Boat",
    description: "This is another boat",
    type: "industrial",
    price: "$600",
  },
  {
    id: 5,
    latitude: 25.592745619619073,
    longitude: -109.05775533256534,
    title: "Another Boat",
    description: "This is another boat",
    type: "touristic",
    price: "$350",
  },
];

const MapScreen: React.FC = () => {
  const { t } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 25.58627632413783,
    longitude: -109.06027458994723,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0221,
  });

  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: number;
    latitude: number;
    longitude: number;
    title: string;
    description: string;
    type: string;
    price: string;
  } | null>(null); // Track the selected marker
  const [previousRegion, setPreviousRegion] = useState(region);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        locations.map((location) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      setPreviousRegion(region);
      // Calculate the offset latitude to move the marker closer to the top
      const panelHeight = Dimensions.get("window").height / 2;
      const latitudeOffset =
        (region.latitudeDelta * (panelHeight - 500)) /
        Dimensions.get("window").height; // Add extra offset for higher positioning

      const newRegion = {
        ...region,
        latitude: selectedLocation.latitude + latitudeOffset,
        longitude: selectedLocation.longitude,
      };

      mapRef.current.animateToRegion(newRegion, 500);
    }
  }, [selectedLocation]);

  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "industrial":
        return require("../../../assets/icons/industrial.png");
      case "touristic":
        return require("../../../assets/icons/touristic.png");
      default:
        return require("../../../assets/icons/touristic.png");
    }
  };

  const handleMarkerPress = (location: any) => {
    setSelectedLocation(location); // Set the selected marker
  };

  const closePopup = () => {
    setSelectedLocation(null); // Clear the selected marker

    if (mapRef.current) {
      mapRef.current.animateToRegion(previousRegion, 500);
    }
  };

  const handleReservation = (locationTitle: string) => {
    alert(`${t("reserve")} ${locationTitle}`);
  };

  return (
    <View style={MapScreenStyles.container}>
      <MapView ref={mapRef} style={MapScreenStyles.map} initialRegion={region}>
        {filteredLocations
          .filter(
            (location) =>
              !selectedLocation || location.id === selectedLocation.id
          )
          .map((location) => (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => handleMarkerPress(location)} // Handle marker press
            >
              <View style={MapScreenStyles.priceLabelContainer}>
                <Text style={MapScreenStyles.priceLabelText}>
                  {location.price}
                </Text>
                <View style={MapScreenStyles.priceLabelTriangle} />
              </View>
              <View style={MapScreenStyles.markerIconContainer}>
                <Image
                  source={getMarkerIcon(location.type)}
                  style={[
                    MapScreenStyles.markerIcon,
                    selectedLocation?.id === location.id &&
                      MapScreenStyles.selectedMarkerIcon, // Apply additional styles if selected
                  ]}
                />
              </View>
            </Marker>
          ))}
      </MapView>

      {/* Sliding Panel Modal */}
      <Modal
        visible={!!selectedLocation}
        transparent={true}
        animationType="slide"
        onRequestClose={closePopup}
      >
        <View style={MapScreenStyles.modalContainer}>
          <View style={MapScreenStyles.modalContent}>
            {selectedLocation && (
              <>
                <Text style={MapScreenStyles.popupTitle}>
                  {selectedLocation.title}
                </Text>
                <Text style={MapScreenStyles.popupDescription}>
                  {selectedLocation.description}
                </Text>
                <Text style={MapScreenStyles.popupPrice}>
                  {t("price")}: {selectedLocation.price}
                </Text>
                <ReservationButton
                  title={t("reserve")}
                  price={selectedLocation.price}
                  onPress={() => handleReservation(selectedLocation.title)}
                />
                <TouchableOpacity onPress={closePopup}>
                  <Text style={MapScreenStyles.popupClose}>{t("close")}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <ButtonsControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFilterChange={(filter) => {
          if (filter === "all") {
            setFilteredLocations(locations);
          } else {
            setFilteredLocations(
              locations.filter((location) => location.type === filter)
            );
          }
        }}
      />
    </View>
  );
};

export default MapScreen;
