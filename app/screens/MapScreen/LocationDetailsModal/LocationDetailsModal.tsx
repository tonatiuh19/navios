import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ReservationButton from "../ReservationButton/ReservationButton";
import { LocationDetailsModalStyles } from "./LocationDetailsModal.style";
import StarRating from "./StarRating/StarRating";

interface LocationDetailsContentProps {
  selectedLocation: {
    id: number;
    title: string;
    description: string;
    price: string;
    rating: number;
  };
  onClose: () => void;
  onReserve: (locationTitle: string) => void;
}

const LocationDetailsModal: React.FC<LocationDetailsContentProps> = ({
  selectedLocation,
  onClose,
  onReserve,
}) => {
  return (
    <View style={LocationDetailsModalStyles.modalContent}>
      <Text style={LocationDetailsModalStyles.popupTitle}>
        {selectedLocation.title}
      </Text>
      <Text style={LocationDetailsModalStyles.popupDescription}>
        {selectedLocation.description}
      </Text>
      <Text style={LocationDetailsModalStyles.popupPrice}>
        Price: {selectedLocation.price}
      </Text>
      <StarRating rating={selectedLocation.rating} />
      <ReservationButton
        title="Reserve"
        price={selectedLocation.price}
        onPress={() => onReserve(selectedLocation.title)}
      />
      <TouchableOpacity onPress={onClose}>
        <Text style={LocationDetailsModalStyles.popupClose}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationDetailsModal;
