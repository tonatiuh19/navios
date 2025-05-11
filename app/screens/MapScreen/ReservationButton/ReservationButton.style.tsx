import { StyleSheet } from "react-native";

export const ReservationButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#0A2463",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "#f29b7c",
    fontSize: 16,
    fontWeight: "bold",
  },
});
