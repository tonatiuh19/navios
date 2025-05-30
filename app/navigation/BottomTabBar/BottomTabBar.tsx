import React from "react";
import { StyleSheet, Text } from "react-native";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import BottomTabBarStyles from "./BottomTabBar.style";
import { useTranslation } from "react-i18next"; // Import useTranslation

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => {
        navigation.navigate(state.routeNames[index]);
      }}
      style={BottomTabBarStyles.bottomNavigation}
      indicatorStyle={BottomTabBarStyles.indicatorStyle}
    >
      {state.routeNames.map((route, index) => {
        let iconName: keyof typeof FontAwesome5.glyphMap;

        if (route === "Mapa") {
          iconName = state.index === index ? "map-marked-alt" : "map-marked";
        } else if (route === "Reservations") {
          iconName = state.index === index ? "calendar-alt" : "calendar";
        } else {
          iconName = "home"; // default icon name
        }

        const iconStyle =
          state.index === index
            ? BottomTabBarStyles.iconSelected
            : BottomTabBarStyles.iconUnselected;

        const titleStyle =
          state.index === index
            ? [BottomTabBarStyles.titleSelected, styles.centeredText]
            : [BottomTabBarStyles.titleUnselected, styles.centeredText];

        const getTabTitle = (route: string): string => {
          switch (route) {
            case "Mapa":
              return t("map"); // Use translation key for "Map"
            case "Reservations":
              return t("reservations"); // Use translation key for "Reservations"
            default:
              return t("map"); // Default to "Map"
          }
        };

        return (
          <BottomNavigationTab
            key={route}
            title={(props) => (
              <Text style={titleStyle}>{getTabTitle(route)}</Text>
            )}
            icon={(props: any) => (
              <FontAwesome5
                name={iconName}
                size={props?.style?.width}
                style={iconStyle}
              />
            )}
            style={BottomTabBarStyles.bottomNavigationTab}
          />
        );
      })}
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    textAlign: "center", // Center the text horizontally
  },
});

export default BottomTabBar;
