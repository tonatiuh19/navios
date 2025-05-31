import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
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
import MarkerItem from "./MarkerItem/MarkerItem";

const getBoundingBox = (location: {
  coords: { latitude: number; longitude: number };
}) => {
  const lat = location.coords.latitude;
  const lng = location.coords.longitude;
  const delta = 0.05;
  return {
    lat_min: lat - delta,
    lat_max: lat + delta,
    lng_min: lng - delta,
    lng_max: lng + delta,
  };
};

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
  const [selectedLocation, setSelectedLocation] = useState<PortsModel | null>(
    null
  );
  const [previousRegion, setPreviousRegion] = useState(region);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  // Get user location and fetch ports
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Fit map to ports when ports change
  useEffect(() => {
    if (mapRef.current && ports.length > 0) {
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
  }, [ports]);

  // Move map when a marker is selected
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      setPreviousRegion(region);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  const handleSearch = useCallback(
    (query: any) => {
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
        const latitudeDelta = Math.abs(lat_max - lat_min) * 1.2;
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
        return;
      }
    },
    [dispatch]
  );

  const handleMarkerPress = useCallback((location: PortsModel) => {
    setSelectedLocation(location);
  }, []);

  const closePopup = useCallback(() => {
    setSelectedLocation(null);
    if (mapRef.current) {
      mapRef.current.animateToRegion(previousRegion, 500);
    }
  }, [previousRegion]);

  const handleReservation = useCallback(
    (locationTitle: string) => {
      alert(`${t("reserve")} ${locationTitle}`);
    },
    [t]
  );

  const resetSearchAndFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedFilter("");
    setSelectedRating(0);
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={resetSearchAndFilters}>
      <View style={MapScreenStyles.container}>
        <SearchBarControls
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          onApplyFilters={() => {}} // Implement as needed
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
            )
            .map((location) => (
              <MarkerItem
                key={location.navios_port_id}
                location={location}
                onPress={() => handleMarkerPress(location)}
                selected={
                  selectedLocation?.navios_port_id === location.navios_port_id
                }
              />
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
