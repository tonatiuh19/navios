import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SearchBarControlsStyles } from "./SearchBarControls.style";
import FilterPanel from "./FilterPanel/FilterPanel";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { Dimensions } from "react-native";

interface SearchBarControlsProps {
  searchQuery: string;
  onSearchChange: (query: any) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onApplyFilters: () => void;
}

const SearchBarControls: React.FC<SearchBarControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  selectedRating,
  onRatingChange,
  onApplyFilters,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const maxLength = Math.floor(screenWidth / 14); // 14 is a reasonable divisor for bold 16px font

  const [showFilters, setShowFilters] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { t } = useTranslation();

  const toggleFilters = () => {
    setShowFilters((prev) => !prev); // Toggle the modal visibility
  };

  const closeFilters = () => {
    setShowFilters(false);
    Keyboard.dismiss(); // Dismiss the keyboard if open
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  const truncateWithEllipsis = (text: string, maxLength: number): string => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
  };

  return (
    <View>
      <View style={[SearchBarControlsStyles.topControlsContainer]}>
        <View style={SearchBarControlsStyles.profileButtonSpacer} />
        <View
          style={[
            SearchBarControlsStyles.searchBarWrapper,
            isFocused && SearchBarControlsStyles.searchBarWrapperFocused, // Apply focused style
          ]}
        >
          <FontAwesome5
            name="search"
            size={16}
            color="#f29b7c"
            style={SearchBarControlsStyles.searchIcon}
          />
          <GooglePlacesAutocomplete
            placeholder={t("search_placeholder")}
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              if (details && details.geometry && details.geometry.viewport) {
                const { northeast, southwest } = details.geometry.viewport;
                const boundingBox = {
                  location: {
                    lat_min: southwest.lat,
                    lat_max: northeast.lat,
                    lng_min: southwest.lng,
                    lng_max: northeast.lng,
                  },
                };
                // Pass boundingBox to your parent or use as needed
                onSearchChange(boundingBox);
              } else {
                onSearchChange(data);
              }
              setIsFocused(false);
            }}
            query={{
              key: "AIzaSyAktVux7ylMfRC_jmSp_0mOrNZECeakv7U",
              language: "es",
              ...(userLocation && {
                location: `${userLocation.latitude},${userLocation.longitude}`,
                radius: 50000, // 50km radius, adjust as needed
              }),
            }}
            renderRow={(data) => (
              <Text
                style={{
                  color: "#f29b7c",
                  fontWeight: "bold",
                  backgroundColor: "#0A2463",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {truncateWithEllipsis(data.description, maxLength)}
              </Text>
            )}
            styles={{
              textInput: {
                backgroundColor: "#0A2463",
                color: "#f29b7c", // White text color
                fontSize: 16,
                fontWeight: "bold",
                //height: 50, // Match the height of the search bar
                paddingHorizontal: 10,
              },
              listView: {
                backgroundColor: "#0A2463",
                borderRadius: 8,
                // color: "#f29b7c",
                zIndex: 200, // Add this
                elevation: 200,
                position: "absolute", // Helps the dropdown overlay
                top: 50, // Adjust as needed to position below the input
                left: 0,
                right: 0,
              },
              row: {
                backgroundColor: "#0A2463",
                color: "#f29b7c",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#f29b7c", // Border color for dropdown items
              },
            }}
            enablePoweredByContainer={false}
          />
          <TouchableOpacity
            style={SearchBarControlsStyles.filterButton}
            onPress={toggleFilters} // Toggle the modal when the button is pressed
          >
            {!showFilters && (
              <Ionicons name="filter-sharp" size={16} color="#f29b7c" /> // Filter icon
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Panel as Modal */}
      <Modal
        visible={showFilters}
        transparent={true}
        animationType="slide"
        onRequestClose={closeFilters}
      >
        <TouchableWithoutFeedback onPress={closeFilters}>
          <View style={SearchBarControlsStyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={SearchBarControlsStyles.modalContent}>
                <FilterPanel
                  selectedType={selectedFilter}
                  onTypeChange={onFilterChange}
                  selectedRating={selectedRating}
                  onRatingChange={onRatingChange}
                  onClose={() => {
                    setShowFilters(false);
                    onApplyFilters(); // Apply filters when the panel is closed
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SearchBarControls;
