import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapScreenStyles } from "./MapScreen.style";
import { useTranslation } from "react-i18next";
import LocationDetailsModal from "./LocationDetailsModal/LocationDetailsModal";
import SearchBarControls from "./SearchBarControls/SearchBarControls";
import { useDispatch, useSelector } from "react-redux";
import { selectPorts } from "@/app/store/selectors";
import { getActivePorts } from "@/app/store/effects";
import { AppDispatch } from "@/app/store";

const locations = [
  {
    id: 1,
    latitude: 25.583386113924508,
    longitude: -109.06555962561359,
    title: "Industrial Boat",
    description: "This is an industrial/commercial boat port",
    type: "industrial",
    price: "$500",
    rating: 4.7, // Add rating
  },
  {
    id: 2,
    latitude: 25.599280834450745,
    longitude: -109.05835576828655,
    title: "Touristic Boat",
    description: "This is a touristic boat",
    type: "touristic",
    price: "$300",
    rating: 4.0,
  },
  {
    id: 3,
    latitude: 25.595495103131913,
    longitude: -109.05574842577126,
    title: "Another Boat",
    description: "This is another boat",
    type: "touristic",
    price: "$400",
    rating: 3.5,
  },
  {
    id: 4,
    latitude: 25.590495103131913,
    longitude: -109.05574842577126,
    title: "Another Boat",
    description: "This is another boat",
    type: "industrial",
    price: "$600",
    rating: 5.0,
  },
  {
    id: 5,
    latitude: 25.592745619619073,
    longitude: -109.05775533256534,
    title: "Another Boat",
    description: "This is another boat",
    type: "touristic",
    price: "$350",
    rating: 3.0,
  },
];

const MapScreen: React.FC = () => {
  const { t } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const dispatch: AppDispatch = useDispatch();
  const ports = useSelector(selectPorts);
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
    rating: number;
  } | null>(null); // Track the selected marker
  const [previousRegion, setPreviousRegion] = useState(region);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    dispatch(getActivePorts());
  }, [dispatch]);

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
        Dimensions.get("window").height;

      const newRegion = {
        ...region,
        latitude: selectedLocation.latitude + latitudeOffset,
        longitude: selectedLocation.longitude,
      };

      mapRef.current.animateToRegion(newRegion, 500);
    }
  }, [selectedLocation]);

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

  const applyFilters = () => {
    let filtered = locations;

    if (selectedFilter) {
      filtered = filtered.filter(
        (location) => location.type === selectedFilter
      );
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(
        (location) => location.rating >= selectedRating
      );
    }

    setFilteredLocations(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      // If the search bar is empty, reset to all locations
      setFilteredLocations(locations);
    } else {
      // Filter locations based on the search query
      setFilteredLocations(
        locations.filter((location) =>
          location.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleMarkerPress = (location: any) => {
    setSelectedLocation(location); // Set the selected marker
  };

  const closePopup = () => {
    setSelectedLocation(null); // Clear the selected marker

    if (mapRef.current) {
      mapRef.current.animateToRegion(previousRegion, 500); // Reset the map region
    }
  };

  const handleReservation = (locationTitle: string) => {
    alert(`${t("reserve")} ${locationTitle}`);
  };

  const resetSearchAndFilters = () => {
    setSearchQuery("");
    setSelectedFilter("");
    setSelectedRating(0);
    setFilteredLocations(locations);
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  return (
    <TouchableWithoutFeedback onPress={resetSearchAndFilters}>
      <View style={MapScreenStyles.container}>
        <SearchBarControls
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          selectedFilter={selectedFilter}
          onFilterChange={(filter) => {
            setSelectedFilter(filter);
            applyFilters();
          }}
          selectedRating={selectedRating}
          onRatingChange={(rating) => {
            setSelectedRating(rating);
            applyFilters();
          }}
          onApplyFilters={applyFilters}
        />
        <MapView
          ref={mapRef}
          style={MapScreenStyles.map}
          initialRegion={region}
        >
          {filteredLocations
            .filter(
              (location) =>
                !selectedLocation || location.id === selectedLocation.id
            ) // Show all markers if no marker is selected
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

        <Modal
          visible={!!selectedLocation}
          transparent={true}
          animationType="slide"
          onRequestClose={closePopup}
        >
          <TouchableWithoutFeedback onPress={closePopup}>
            <View style={MapScreenStyles.modalContainer}>
              {selectedLocation && (
                <LocationDetailsModal
                  selectedLocation={selectedLocation}
                  onClose={closePopup}
                  onReserve={handleReservation}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MapScreen;
