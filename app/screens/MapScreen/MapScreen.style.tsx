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
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
    backgroundColor: "transparent",
  },
  modalContent: {
    height: Dimensions.get("window").height / 2, // Half the screen height
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  popupPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f29b7c",
    marginBottom: 10,
  },
  popupClose: {
    fontSize: 14,
    color: "#007BFF",
    textAlign: "center",
    marginTop: 10,
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
