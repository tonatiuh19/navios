import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "../BottomTabBar/BottomTabBar";
import ProfileButton from "./ProfileButton/ProfileButton";
import { Image, StyleSheet } from "react-native";
import MapScreen from "@/app/screens/MapScreen/MapScreen";
import ReservationsScreen from "@/app/screens/ReservationsScreen/ReservationsScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => (
  <Navigator
    initialRouteName="Mapa"
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={({ navigation, route }) => ({
      headerRight: () => {
        const isMapScreen = route.name === "Mapa";
        return (
          <ProfileButton
            onPress={() => navigation.navigate("Profile")}
            style={isMapScreen ? styles.mapProfileButton : undefined}
            iconColor={isMapScreen ? "#f29b7c" : "#000"} // Dark icon for MapScreen
          />
        );
      },
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#000", // Default background color for other screens
        shadowColor: "transparent", // Removes shadow on iOS
        elevation: 0, // Removes shadow on Android
      },
    })}
  >
    <Screen
      name="Mapa"
      component={MapScreen}
      options={{
        headerTransparent: true, // Makes the header transparent
        headerTitle: "", // Removes the title
        headerStyle: undefined, // Ensure no background color is applied
      }}
    />
    <Screen
      name="Reservations"
      component={ReservationsScreen}
      options={{
        headerTitle: "Mis Reservas",
        headerTitleStyle: {
          fontSize: 30,
          fontFamily: "Kanit-Regular",
          fontWeight: "bold",
          color: "#000",
        },
      }}
    />
  </Navigator>
);

const styles = StyleSheet.create({
  mapProfileButton: {
    backgroundColor: "#0A2463", // White background for MapScreen
    borderRadius: 25, // Circular shape
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
});

export default TabNavigator;
