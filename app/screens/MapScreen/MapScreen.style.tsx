import { Dimensions, StyleSheet } from "react-native";

export const MapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerIconContainer: {
    width: 40,
    height: 40,
  },
  markerIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  selectedMarkerIcon: {
    width: 50, // Make the selected marker larger
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  priceLabelContainer: {
    alignItems: "center",
    marginBottom: 1, // Space between the price label and the marker
  },
  priceLabelText: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // Add a slight shadow for better visibility
  },
  priceLabelTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff", // Match the price label background color
    marginTop: -1, // Slight overlap with the price label
  },
});
