import React from "react";
import { Marker } from "react-native-maps";
import { View, Image, Text } from "react-native";
import { PortsModel } from "@/app/app.model";
import { parsePrice } from "@/app/utils/functions/UtilsFunctions";
import { MarkerItemStyles } from "./MarkerItem.style";

interface MarkerItemProps {
  location: PortsModel;
  onPress: () => void;
  selected: boolean;
}

const getMarkerIcon = (type: number) => {
  switch (type) {
    case 1:
      return require("../../../../assets/icons/industrial.png");
    case 2:
      return require("../../../../assets/icons/touristic.png");
    default:
      return require("../../../../assets/icons/touristic.png");
  }
};

const MarkerItem: React.FC<MarkerItemProps> = React.memo(
  ({ location, onPress, selected }) => (
    <Marker
      key={location.navios_port_id}
      coordinate={{
        latitude: Number(location.navios_port_latitude),
        longitude: Number(location.navios_port_longitude),
      }}
      onPress={onPress}
    >
      <View style={MarkerItemStyles.priceLabelContainer}>
        <Text style={MarkerItemStyles.priceLabelText}>
          {parsePrice(location.navios_port_price)}
        </Text>
        <View style={MarkerItemStyles.priceLabelTriangle} />
      </View>
      <View style={MarkerItemStyles.markerIconContainer}>
        <Image
          source={getMarkerIcon(location.navios_port_type)}
          style={[
            MarkerItemStyles.markerIcon,
            selected && MarkerItemStyles.selectedMarkerIcon,
          ]}
        />
      </View>
    </Marker>
  )
);

export default MarkerItem;
