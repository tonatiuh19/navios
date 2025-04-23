import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { ProfileScreenStyles } from "./ProfileScreen.style";

const ProfileScreen = () => {
  const handleEditProfile = () => {
    // Handle edit profile action
    console.log("Edit Profile Pressed");
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
    </View>
  );
};

export default ProfileScreen;
