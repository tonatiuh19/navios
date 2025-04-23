import React from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileButtonStyles } from "./ProfileButton.style";

interface ProfileButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  onPress,
  style,
  iconColor = "white", // Default icon color
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[ProfileButtonStyles.button, style]}
  >
    <Ionicons name="person-circle-outline" size={24} color={iconColor} />
  </TouchableOpacity>
);

export default ProfileButton;
