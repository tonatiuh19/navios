import { StyleSheet } from "react-native";

export const MapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  searchHereContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    zIndex: 10,
    backgroundColor: "#0A2463",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchHereContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchHereText: { color: "#f29b7c", fontWeight: "bold" },
  searchIcon: {
    marginRight: 10, // Space between the icon and the text input
  },
});
