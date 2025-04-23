import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ReservationsScreenStyles } from "./ReservationsScreen.style";

const ReservationsScreen = () => {
  const reservations = [
    { id: "1", name: "Reservation 1", date: "2023-10-01" },
    { id: "2", name: "Reservation 2", date: "2023-10-05" },
    { id: "3", name: "Reservation 3", date: "2023-10-10" },
  ];

  const renderReservation = ({
    item,
  }: {
    item: { id: string; name: string; date: string };
  }) => (
    <TouchableOpacity style={ReservationsScreenStyles.reservationItem}>
      <Text style={ReservationsScreenStyles.reservationName}>{item.name}</Text>
      <Text style={ReservationsScreenStyles.reservationDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={ReservationsScreenStyles.container}>
      <Text style={ReservationsScreenStyles.title}>Reservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservation}
        contentContainerStyle={ReservationsScreenStyles.list}
      />
    </View>
  );
};

export default ReservationsScreen;
