import { Dimensions, StyleSheet } from "react-native";

export const LocationDetailsModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  modalContent: {
    height: Dimensions.get("window").height / 2,
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
});
