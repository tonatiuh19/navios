import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");
const marginBottom = height * 0.025;

const BottomTabBarStyles = StyleSheet.create({
  bottomNavigation: {
    paddingBottom: marginBottom, // Ensure this variable is defined
    backgroundColor: "#0A2463", // Deep Navy Blue (primary theme)
    borderTopWidth: 1,
    borderTopColor: "#3E92CC", // Ocean Teal accent
  },
  bottomNavigationTab: {
    paddingVertical: 8, // Slightly reduced for compactness
    paddingHorizontal: 12, // Balanced spacing
  },
  iconSelected: {
    color: "#f29b7c", // Ocean Teal (selected state)
  },
  iconUnselected: {
    color: "#6C757D", // Harbor Gray (unselected, softer than #808080)
  },
  titleSelected: {
    color: "#f29b7c", // Ocean Teal (matches selected icon)
    fontFamily: "Kanit-Regular",
    fontSize: 10, // Slightly larger for readability
    fontWeight: "500", // Medium weight for emphasis
  },
  titleUnselected: {
    color: "#6C757D", // Harbor Gray (unselected)
    fontFamily: "Kanit-Regular",
    fontSize: 9, // Smaller than selected
  },
  indicatorStyle: {
    backgroundColor: "#f29b7c", // Sunset Coral (vibrant accent for visibility)
    height: 3, // Slightly thicker for prominence
  },
});

export default BottomTabBarStyles;
