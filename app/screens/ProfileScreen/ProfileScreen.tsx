import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { ProfileScreenStyles } from "./ProfileScreen.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { selectUserInfo } from "@/app/store/selectors";
import { logout } from "@/app/store/effects";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator/AppNavigator";

const ProfileScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleEditProfile = () => {
    // Handle edit profile action
    console.log("Edit Profile Pressed");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("navios_user_id");
      const value = await AsyncStorage.getItem("navios_user_id");
      console.log("Value after removal:", value); // Should be null
      dispatch(logout(userInfo.info?.navios_user_id));
      navigation.navigate("Main");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={ProfileScreenStyles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={ProfileScreenStyles.profileImage}
      />
      <Text style={ProfileScreenStyles.name}>John Doe</Text>
      <Text style={ProfileScreenStyles.email}>johndoe@example.com</Text>
      <Button title="Edit Profile" onPress={handleEditProfile} />
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
