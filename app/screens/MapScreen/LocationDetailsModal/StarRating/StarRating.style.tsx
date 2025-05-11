import { StyleSheet } from "react-native";

export const StarRatingStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    fontSize: 18,
    color: "#FFD700", // Gold color for full stars
    marginHorizontal: 2,
  },
  halfStar: {
    fontSize: 18,
    color: "#FFD700", // Gold color for half stars
    marginHorizontal: 2,
  },
  emptyStar: {
    fontSize: 18,
    color: "#CCCCCC", // Gray color for empty stars
    marginHorizontal: 2,
  },
});
