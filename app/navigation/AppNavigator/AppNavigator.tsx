import React, { useEffect, useState } from "react";
import TabNavigator from "../TabNavigator/TabNavigator";
import BackButton from "../TabNavigator/shared/components/BackButton/BackButton";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "@/app/screens/ProfileScreen/ProfileScreen";
import LoginScreen from "@/app/screens/LoginScreen/LoginScreen";
import { selectUserInfo } from "@/app/store/selectors";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Reservations: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const userInfo = useSelector(selectUserInfo);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("navios_user_id");
        console.log("Stored user id", storedUserId);
        if (storedUserId !== "0" && storedUserId !== null) {
          setIsAuthenticated(true);
        } else {
          console.log("Validating user session", storedUserId);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to load user session", error);
      }
    };

    checkUserSession();
  }, [userInfo]);

  return (
    <Navigator>
      {isAuthenticated ? (
        <>
          <Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
              headerTitle: "Mi Perfil",
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: "Kanit-Regular",
                fontWeight: "bold",
                color: "#000",
              },
              headerLeft: () => (
                <BackButton onPress={() => navigation.goBack()} />
              ),
            })}
          />
        </>
      ) : (
        <Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Navigator>
  );
};

export default AppNavigator;
