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
import * as Location from "expo-location";
import { PortsModel } from "@/app/app.model";
import { parsePrice } from "@/app/utils/functions/UtilsFunctions";

/*const locations = [
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
];*/

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

  //const [filteredLocations, setFilteredLocations] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState<PortsModel | null>(
    null
  ); // Track the selected marker
  const [previousRegion, setPreviousRegion] = useState(region);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        console.log("Current location:", getBoundingBox(location));
        dispatch(getActivePorts(getBoundingBox(location)));
        setRegion((prev) => ({
          ...prev,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }));
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            500
          );
        }
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    console.log("Ports updated:", ports);
  }, [ports]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        ports.map((location) => ({
          latitude: Number(location.navios_port_latitude),
          longitude: Number(location.navios_port_longitude),
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
        latitude:
          Number(selectedLocation.navios_port_latitude) + latitudeOffset,
        longitude: Number(selectedLocation.navios_port_longitude),
      };

      mapRef.current.animateToRegion(newRegion, 500);
    }
  }, [selectedLocation]);

  const getMarkerIcon = (type: number) => {
    switch (type) {
      case 1:
        return require("../../../assets/icons/industrial.png");
      case 2:
        return require("../../../assets/icons/touristic.png");
      default:
        return require("../../../assets/icons/touristic.png");
    }
  };

  const applyFilters = () => {
    console.log("Applying filters:");
    /* let filtered = locations;

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

    setFilteredLocations(filtered);*/
  };

  const getBoundingBox = (location: {
    coords: { latitude: any; longitude: any };
  }) => {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    const delta = 0.05; // ~5km, adjust as needed

    return {
      lat_min: lat - delta,
      lat_max: lat + delta,
      lng_min: lng - delta,
      lng_max: lng + delta,
    };
  };

  const handleSearch = (query: any) => {
    console.log("Search query:", query);
    //dispatch(getActivePorts(getBoundingBox(query)));
    if (query && query.location) {
      const { lat_min, lat_max, lng_min, lng_max } = query.location;
      dispatch(
        getActivePorts({
          lat_min,
          lat_max,
          lng_min,
          lng_max,
        })
      );
      const latitude = (lat_min + lat_max) / 2;
      const longitude = (lng_min + lng_max) / 2;
      const latitudeDelta = Math.abs(lat_max - lat_min) * 1.2; // Add some padding
      const longitudeDelta = Math.abs(lng_max - lng_min) * 1.2;

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: latitudeDelta || 0.05,
        longitudeDelta: longitudeDelta || 0.05,
      };

      setRegion(newRegion);

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 500);
      }
      // Optionally, filter your locations here if needed
      return;
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
          {ports
            .filter(
              (location) =>
                !selectedLocation ||
                location.navios_port_id === selectedLocation.navios_port_id
            ) // Show all markers if no marker is selected
            .map((location) => (
              <Marker
                key={location.navios_port_id}
                coordinate={{
                  latitude: Number(location.navios_port_latitude),
                  longitude: Number(location.navios_port_longitude),
                }}
                onPress={() => handleMarkerPress(location)} // Handle marker press
              >
                <View style={MapScreenStyles.priceLabelContainer}>
                  <Text style={MapScreenStyles.priceLabelText}>
                    {parsePrice(location.navios_port_price)}
                  </Text>
                  <View style={MapScreenStyles.priceLabelTriangle} />
                </View>
                <View style={MapScreenStyles.markerIconContainer}>
                  <Image
                    source={getMarkerIcon(location.navios_port_type)}
                    style={[
                      MapScreenStyles.markerIcon,
                      selectedLocation?.navios_port_id ===
                        location.navios_port_id &&
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
