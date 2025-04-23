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
  zoomControls: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "column",
  },
  zoomButton: {
    width: 50,
    height: 50,
    backgroundColor: "#0A2463",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  zoomText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f29b7c",
  },
});
