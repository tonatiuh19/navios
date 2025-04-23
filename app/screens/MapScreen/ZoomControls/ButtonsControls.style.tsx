import { StyleSheet } from "react-native";

export const ButtonsControlsStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f29b7c",
  },
  additionalButtons: {
    marginBottom: 10,
  },
  filterMenu: {
    position: "absolute",
    top: 0,
    left: -250, // Start off-screen on the left
    width: 250,
    height: "100%",
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  filterButton: {
    padding: 15,
    backgroundColor: "#f29b7c",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedFilterButton: {
    backgroundColor: "#0A2463", // Highlighted background for selected filter
  },
  selectedFilterText: {
    color: "#f29b7c", // Highlighted text color for selected filter
  },
});
