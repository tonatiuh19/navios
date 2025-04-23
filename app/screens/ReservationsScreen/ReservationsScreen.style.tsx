import { StyleSheet } from "react-native";

export const ReservationsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  reservationItem: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  reservationName: {
    fontSize: 18,
    fontWeight: "600",
  },
  reservationDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
