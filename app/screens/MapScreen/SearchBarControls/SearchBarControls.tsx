import React, { useState } from "react";
import {
  View,
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

interface SearchBarControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
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
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

  const toggleFilters = () => {
    setShowFilters((prev) => !prev); // Toggle the modal visibility
  };

  const closeFilters = () => {
    setShowFilters(false);
    Keyboard.dismiss(); // Dismiss the keyboard if open
  };

  return (
    <View>
      {/* Search Bar */}
      <View style={SearchBarControlsStyles.topControlsContainer}>
        <View style={SearchBarControlsStyles.profileButtonSpacer} />
        <View style={SearchBarControlsStyles.searchBarWrapper}>
          <FontAwesome5
            name="search"
            size={16}
            color="#f29b7c"
            style={SearchBarControlsStyles.searchIcon}
          />
          <TextInput
            style={SearchBarControlsStyles.searchBar}
            placeholder={t("search_placeholder")}
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={onSearchChange}
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
