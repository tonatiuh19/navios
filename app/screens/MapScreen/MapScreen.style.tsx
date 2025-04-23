import { StyleSheet } from "react-native";

export const MapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  industrialIcon: {
    fontSize: 24, // Icon size
    color: "#FF6347", // Tomato red for industrial/commercial boats
  },
  touristicIcon: {
    fontSize: 24, // Icon size
    color: "#1E90FF", // Dodger blue for touristic boats
  },
  defaultIcon: {
    fontSize: 24, // Icon size
    color: "#000", // Default black color
  },
});
