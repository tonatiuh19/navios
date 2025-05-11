import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ReservationButtonStyles } from "./ReservationButton.style";

interface ReservationButtonProps {
  title: string;
  price: string;
  onPress: () => void;
  style?: object;
}

const ReservationButton: React.FC<ReservationButtonProps> = ({
  title,
  price,
  onPress,
  style,
}) => {
  const { t } = useTranslation(); // Use i18n translations

  return (
    <TouchableOpacity
      style={[ReservationButtonStyles.button, style]}
      onPress={onPress}
    >
      <View style={ReservationButtonStyles.content}>
        <Text style={ReservationButtonStyles.title}>{t("reserve")}</Text>
        <Text style={ReservationButtonStyles.price}>{`${t(
          "price"
        )}: ${price}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReservationButton;
