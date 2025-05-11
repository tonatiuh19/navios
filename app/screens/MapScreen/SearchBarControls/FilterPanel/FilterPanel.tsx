import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useTranslation } from "react-i18next"; // Import i18n hook
import { FilterPanelStyles } from "./FilterPanel.style";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

interface FilterPanelProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedType,
  onTypeChange,
  selectedRating,
  onRatingChange,
  onClose,
}) => {
  const { t } = useTranslation(); // Use i18n translation hook

  return (
    <View style={FilterPanelStyles.container}>
      {/* Filter by Type */}
      <Text style={FilterPanelStyles.sectionTitle}>{t("filter_by_type")}</Text>
      <View style={FilterPanelStyles.filterOptions}>
        <TouchableOpacity
          style={[
            FilterPanelStyles.filterOption,
            selectedType === "industrial" && FilterPanelStyles.selectedOption,
          ]}
          onPress={() => onTypeChange("industrial")}
        >
          <Text
            style={[
              FilterPanelStyles.filterOptionText,
              selectedType === "industrial" &&
                FilterPanelStyles.selectedOptionText,
            ]}
          >
            {t("industrial")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            FilterPanelStyles.filterOption,
            selectedType === "touristic" && FilterPanelStyles.selectedOption,
          ]}
          onPress={() => onTypeChange("touristic")}
        >
          <Text
            style={[
              FilterPanelStyles.filterOptionText,
              selectedType === "touristic" &&
                FilterPanelStyles.selectedOptionText,
            ]}
          >
            {t("touristic")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            FilterPanelStyles.filterOption,
            selectedType === "" && FilterPanelStyles.selectedOption,
          ]}
          onPress={() => onTypeChange("")}
        >
          <Text
            style={[
              FilterPanelStyles.filterOptionText,
              selectedType === "" && FilterPanelStyles.selectedOptionText,
            ]}
          >
            {t("all")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter by Rating */}
      <Text style={FilterPanelStyles.sectionTitle}>
        {t("filter_by_rating")}
      </Text>
      <Slider
        style={FilterPanelStyles.slider}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={selectedRating}
        onValueChange={onRatingChange}
        minimumTrackTintColor="#f29b7c"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#f29b7c"
      />
      <Text style={FilterPanelStyles.sliderValue}>
        {selectedRating} {t("stars")}
      </Text>

      {/* Buttons Row */}
      <View style={FilterPanelStyles.buttonsRow}>
        {/* Close Button */}
        <TouchableOpacity
          style={FilterPanelStyles.closeButton}
          onPress={onClose}
        >
          <Ionicons
            name="close-sharp"
            style={FilterPanelStyles.closeButtonText}
            color="black"
          />
        </TouchableOpacity>

        {/* Apply Filters Button */}
        <TouchableOpacity
          style={FilterPanelStyles.applyButton}
          onPress={onClose}
        >
          <Text style={FilterPanelStyles.applyButtonText}>
            {t("apply_filters")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterPanel;
