import React, { useEffect, useState, useCallback } from "react";
import { View, Image, Text } from "react-native";
import { LoginScreenStyles } from "./LoginScreen.style";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserExist, selectUserInfo } from "../../store/selectors";
import { insertUser, validateUserByEmail } from "../../store/effects";
import SignInForm from "./SignInForm/SignInForm";
import LoginForm from "./LoginForm/LoginForm";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isUserExist = useSelector(selectIsUserExist);
  const userInfo = useSelector(selectUserInfo);
  const [nextSection, setNextSection] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    //console.log("User Info", userInfo);
  }, [userInfo]);

  useFocusEffect(
    useCallback(() => {
      // Refresh logic here
      console.log("Focused");
      setNextSection(false);
      setPickerVisible(false);
    }, [])
  );

  const handleSignIn = (values: any) => {
    dispatch(
      insertUser(
        values.fullName,
        values.dateOfBirth,
        userInfo.info.navios_user_email,
        "MEX",
        1
      )
    );
    // Handle sign in logic here
  };

  const handleLogin = (values: any) => {
    setNextSection(true);
    dispatch(validateUserByEmail(values.email));
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#000000" }}
      enableOnAndroid={true}
      extraHeight={65}
      extraScrollHeight={65}
      scrollEnabled={false}
    >
      <View style={LoginScreenStyles.container}>
        <View style={LoginScreenStyles.logoContainer}>
          {/*<Image
            source={require("../../utils/images/by.png")} 
            style={LoginScreenStyles.logo}
          />*/}
        </View>
        <View style={LoginScreenStyles.cardContainer}>
          {nextSection ? (
            <SignInForm
              isUserExist={isUserExist}
              handleSignIn={handleSignIn}
              setNextSection={setNextSection}
              pickerVisible={pickerVisible}
              setPickerVisible={setPickerVisible}
              setUserExists={setUserExists}
            />
          ) : (
            <LoginForm
              handleLogin={handleLogin}
              setNextSection={setNextSection}
            />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
