import { StyleSheet } from "react-native";

export const FilterPanelStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterOption: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  selectedOption: {
    backgroundColor: "#f29b7c",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#000",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderValue: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  closeButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginRight: 5,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#f29b7c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
