import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { ButtonsControlsStyles } from "./ButtonsControls.style";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

interface ButtonsControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFilterChange: (filter: string) => void;
}

const ButtonsControls: React.FC<ButtonsControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onFilterChange,
}) => {
  const [showButtons, setShowButtons] = useState(false); // State to toggle button visibility
  const [filterMenuVisible, setFilterMenuVisible] = useState(false); // State for filter menu visibility
  const animationValue = useRef(new Animated.Value(0)).current;

  const [selectedFilter, setSelectedFilter] = useState("all");

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
    setFilterMenuVisible(false);
    Animated.timing(animationValue, {
      toValue: showButtons ? 0 : 1, // Slide out if visible, slide in if hidden
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible((prev) => !prev);
  };

  const applyFilter = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter); // Pass the selected filter to the parent
  };

  const slideAnimation = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0], // Slide in from 100px below
        }),
      },
    ],
  };

  return (
    <View style={ButtonsControlsStyles.container}>
      <TouchableOpacity
        style={ButtonsControlsStyles.button}
        onPress={toggleButtons}
      >
        <Text style={ButtonsControlsStyles.text}>
          {showButtons ? (
            <Entypo name="chevron-down" size={24} color="#f29b7c" />
          ) : (
            <Entypo name="chevron-up" size={24} color="#f29b7c" />
          )}
        </Text>
      </TouchableOpacity>
      {showButtons && (
        <>
          {filterMenuVisible && (
            <Animated.View style={[ButtonsControlsStyles.filterMenu]}>
              <TouchableOpacity
                style={[
                  ButtonsControlsStyles.filterButton,
                  selectedFilter === "all" &&
                    ButtonsControlsStyles.selectedFilterButton,
                ]}
                onPress={() => applyFilter("all")}
              >
                <Text
                  style={[
                    ButtonsControlsStyles.filterText,
                    selectedFilter === "all" &&
                      ButtonsControlsStyles.selectedFilterText,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  ButtonsControlsStyles.filterButton,
                  selectedFilter === "industrial" &&
                    ButtonsControlsStyles.selectedFilterButton,
                ]}
                onPress={() => applyFilter("industrial")}
              >
                <Text
                  style={[
                    ButtonsControlsStyles.filterText,
                    selectedFilter === "industrial" &&
                      ButtonsControlsStyles.selectedFilterText,
                  ]}
                >
                  Industrial
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  ButtonsControlsStyles.filterButton,
                  selectedFilter === "touristic" &&
                    ButtonsControlsStyles.selectedFilterButton,
                ]}
                onPress={() => applyFilter("touristic")}
              >
                <Text
                  style={[
                    ButtonsControlsStyles.filterText,
                    selectedFilter === "touristic" &&
                      ButtonsControlsStyles.selectedFilterText,
                  ]}
                >
                  Touristic
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          <Animated.View
            style={[ButtonsControlsStyles.additionalButtons, slideAnimation]}
          >
            <TouchableOpacity
              style={ButtonsControlsStyles.button}
              onPress={toggleFilterMenu}
            >
              <Ionicons name="filter-outline" size={24} color="#f29b7c" />
            </TouchableOpacity>
            <TouchableOpacity style={ButtonsControlsStyles.button}>
              <MaterialCommunityIcons
                name="chat-processing-outline"
                size={24}
                color="#f29b7c"
              />
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      <TouchableOpacity style={ButtonsControlsStyles.button} onPress={onZoomIn}>
        <Text style={ButtonsControlsStyles.text}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ButtonsControlsStyles.button}
        onPress={onZoomOut}
      >
        <Text style={ButtonsControlsStyles.text}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonsControls;
