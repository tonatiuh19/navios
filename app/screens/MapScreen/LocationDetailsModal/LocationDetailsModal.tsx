import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ReservationButton from "../ReservationButton/ReservationButton";
import { LocationDetailsModalStyles } from "./LocationDetailsModal.style";
import StarRating from "./StarRating/StarRating";
import { PortsModel } from "@/app/app.model";
import { parsePrice } from "@/app/utils/functions/UtilsFunctions";

interface LocationDetailsContentProps {
  selectedLocation: PortsModel;
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
        {selectedLocation.navios_port_title}
      </Text>
      <Text style={LocationDetailsModalStyles.popupDescription}>
        {selectedLocation.navios_port_description}
      </Text>
      <Text style={LocationDetailsModalStyles.popupPrice}>
        Price: {parsePrice(selectedLocation.navios_port_price)}
      </Text>
      <StarRating rating={Number(selectedLocation.average_rating)} />
      <ReservationButton
        title="Reserve"
        price={parsePrice(selectedLocation.navios_port_price)}
        onPress={() => onReserve(selectedLocation.navios_port_title)}
      />
      <TouchableOpacity onPress={onClose}>
        <Text style={LocationDetailsModalStyles.popupClose}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationDetailsModal;
