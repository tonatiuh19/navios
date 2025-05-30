import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const LoginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align items to the bottom
    alignItems: "center", // Center horizontally
    padding: 20,
    backgroundColor: "#ffffff", // Black background
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20, // Space between the logo and the card container
  },
  cardContainer: {
    backgroundColor: "#0A2463", // Dark gray background
    padding: 20,
    borderRadius: 22,
    width: width - 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000", // Black shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20, // Space between the card container and the bottom of the screen
  },
  logo: {
    width: 250, // Adjust the width as needed
    height: 250, // Adjust the height as needed
  },
  logoText: {
    color: "#f29b7c", // White text color
    fontSize: 24,
    fontFamily: "Kanit-Regular",
    marginTop: 0,
  },
  input: {
    height: 50,
    borderColor: "#f29b7c", // Dark gray border
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff", // Black background for input
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
    width: "100%",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  generalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputError: {
    height: 50,
    borderColor: "#f29b7c", // Dark gray border
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#0A2463", // Black background for input
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
    width: "100%",
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  generalContainerError: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer: {
    paddingLeft: 15,
    height: 70,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#fff", // Black background for flag container
    borderColor: "#f29b7c", // Dark gray border
    borderWidth: 1,
    borderRightWidth: 0, // Remove left border
    borderTopLeftRadius: 22, // Equivalent to 1.375rem
    borderBottomLeftRadius: 22,
  },
  picker: {
    width: 80, // Adjust width to ensure it displays correctly
    color: "#ffffff", // White text color
    fontFamily: "Kanit-Regular",
    backgroundColor: "#000000", // Black background for picker
    fontSize: 14, // Set a reasonable font size
    paddingVertical: 5, // Decrease vertical padding
  },
  hiddenPicker: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  pickerText: {
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
    fontSize: 14, // Set a reasonable font size
  },
  pickerTouchable: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  phoneInput: {
    flex: 1,
    height: 70,
    borderColor: "#f29b7c", // Dark gray border
    borderWidth: 1,
    borderLeftWidth: 0, // Remove right border
    paddingHorizontal: 10,
    backgroundColor: "#fff", // Black background for input
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
    borderTopRightRadius: 22, // Equivalent to 1.375rem
    borderBottomRightRadius: 22,
  },
  error: {
    color: "#fff", // Red error text
    fontFamily: "Kanit-Regular",
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#f29b7c", // Dark gray button background
    color: "#000", // White button text
    padding: 10,
    borderRadius: 22,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000", // White button text
    fontFamily: "Kanit-Regular",
  },
  buttonLink: {
    color: "#f29b7c", // White button text
    padding: 10,
    borderRadius: 22,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonLinkText: {
    color: "#f29b7c", // White button text
    fontFamily: "Kanit-Regular",
  },
  secondaryButton: {
    backgroundColor: "#0A2463", // Dark gray button background
    color: "#f29b7c", // White button text
    fontFamily: "Kanit-Regular",
    padding: 10,
    borderRadius: 22,
    borderColor: "#f29b7c", // Dark gray border
    borderWidth: 1,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  secodnaryButtonText: {
    color: "#f29b7c", // White button text
    fontFamily: "Kanit-Regular",
  },
  phoneFullNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#f29b7c", // Dark gray border
    backgroundColor: "#0A2463", // Black background for phone number container
    borderWidth: 1,
    borderRadius: 22, // Equivalent to 1.375rem
  },
  phoneZoneContainer: {
    flexDirection: "row",
    backgroundColor: "#0A2463", // Black background for phone zone container
    borderWidth: 1,
    borderTopLeftRadius: 22, // Equivalent to 1.375rem
    borderBottomLeftRadius: 22,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 10,
  },
  flagImage: {
    width: 35,
    height: 18,
    marginRight: 8,
    marginLeft: 5,
  },
  phoneZoneText: {
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
  },
  phoneNumberContainer: {
    backgroundColor: "#0A2463", // Black background for phone number container
    borderWidth: 1,
    borderTopRightRadius: 22, // Equivalent to 1.375rem
    borderBottomRightRadius: 22,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  phoneNumberText: {
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
  },
  label: {
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioText: {
    color: "#ffffff", // White text color
    marginLeft: 10,
  },
  timerResendText: {
    marginTop: 20,
    color: "#f29b7c",
    fontFamily: "Kanit-Regular",
    fontSize: 15,
  },
  timerCodecontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  timerCodeText: {
    fontSize: 16,
    color: "#f29b7c",
  },
  timerCodeTextRed: {
    color: "#f29b7c",
  },
  termsText: {
    color: "#f29b7c", // White text color
    fontFamily: "Kanit-Regular",
    textAlign: "center",
    marginTop: 25,
  },
  linkText: {
    color: "#47914a", // Link color
    textDecorationLine: "underline",
  },
  datePickerContainer: {
    marginLeft: 20, // Example margin
    marginRight: 20, // Example margin
    marginBottom: 20, // Example margin
    borderColor: "#f29b7c", // Dark gray border
    backgroundColor: "#fff", // Black background for phone number container
    borderWidth: 1,
    borderRadius: 22,
    color: "#f29b7c", // White text color
  },
  datePicker: {
    color: "#f29b7c", // White text color
  },
});
