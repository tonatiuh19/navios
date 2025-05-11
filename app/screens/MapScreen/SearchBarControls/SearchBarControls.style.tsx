import { StyleSheet } from "react-native";

export const SearchBarControlsStyles = StyleSheet.create({
  topControlsContainer: {
    position: "absolute",
    top: 52, // Adjust for the notch
    left: 10,
    right: 10,
    flexDirection: "row-reverse", // Profile button on the right
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  profileButtonSpacer: {
    width: 50, // Reserve space for the profile button
    height: 50,
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A2463", // Match the profile button background
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10, // Add spacing between the search bar and filter button
  },
  searchIcon: {
    marginRight: 10, // Space between the icon and the text input
  },
  searchBar: {
    flex: 1,
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
  filterPanelContainer: {
    marginTop: 100, // Space between the search bar and the filter panel
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent", // Semi-transparent background
    top: 90,
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    //backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
