import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");
const marginBottom = height * 0.025;

export const ProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});
