import React, { useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { LoginScreenStyles } from "../LoginScreen.style";
import { Formik } from "formik";
import * as Yup from "yup";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC<any> = ({ handleLogin }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("login.invalid_email")) // <-- Use i18n
      .required(t("login.email_required")), // <-- Use i18n
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
          <View
            style={
              errors.email && touched.email
                ? LoginScreenStyles.generalContainerError
                : LoginScreenStyles.generalContainer
            }
          >
            <View style={LoginScreenStyles.pickerContainer}>
              <View style={LoginScreenStyles.pickerTouchable}>
                <Feather name="mail" size={18} color="#f29b7c" />
              </View>
            </View>
            <TextInput
              style={LoginScreenStyles.phoneInput}
              placeholder={t("login.email_placeholder")}
              placeholderTextColor="#f29b7c"
              onChangeText={(text) =>
                handleChange("email")(text.replace(/\s/g, "").toLowerCase())
              }
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
          {errors.email && touched.email && (
            <Text style={LoginScreenStyles.error}>{errors.email}</Text>
          )}
          <TouchableOpacity
            style={LoginScreenStyles.button}
            onPress={() => handleSubmit()}
          >
            <Text style={LoginScreenStyles.buttonText}>
              {t("login.continue")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Formik>
  );
};

export default LoginForm;
