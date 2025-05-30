import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoginScreenStyles } from "../LoginScreen.style";
import { selectUserInfo } from "../../../store/selectors";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import CodeValidationForm from "../CodeValidationForm/CodeValidationForm";
import Feather from "@expo/vector-icons/Feather";
import { formatDate } from "@/app/utils/functions/UtilsFunctions";
import { useTranslation } from "react-i18next";

const SignInForm: React.FC<any> = ({
  isUserExist,
  handleSignIn,
  setNextSection,
  setUserExists,
}) => {
  const { t } = useTranslation();
  const userInfo = useSelector(selectUserInfo);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isSettingDateOfBirth, setIsSettingDateOfBirth] = useState(false);

  useEffect(() => {
    console.log("isUserExist", isUserExist);
    console.log("userInfo", userInfo);
    setUserExists(isUserExist); // Update the parent state when isUserExist changes
  }, [isUserExist, setUserExists]);

  const onChange = (event: any, selectedDate: any, setFieldValue: any) => {
    const currentDate = selectedDate || date;
    if (Platform.OS !== "ios") {
      console.log(
        "Current Date",
        currentDate.setDate(currentDate.getDate() - 1)
      );
      setShow(false);
    }
    setDate(currentDate);
    setFieldValue("dateOfBirth", formatDate(currentDate)); // Update dateOfBirth field
  };

  const handleDateOfBirth = () => {
    setIsSettingDateOfBirth(false);
    setShow(false);
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t("login.full_name_required")),
    dateOfBirth: Yup.string().required(t("login.date_of_birth_required")),
  });

  return (
    <Formik
      initialValues={{
        fullName: "",
        dateOfBirth: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <>
          {!isUserExist ? (
            <>
              {!isSettingDateOfBirth && (
                <>
                  <TextInput
                    style={
                      errors.fullName && touched.fullName
                        ? LoginScreenStyles.inputError
                        : LoginScreenStyles.input
                    }
                    placeholder={t("login.full_name_placeholder")}
                    placeholderTextColor="#f29b7c"
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text style={LoginScreenStyles.error}>
                      {errors.fullName}
                    </Text>
                  )}
                </>
              )}
              {!show && (
                <TouchableOpacity
                  style={
                    errors.dateOfBirth && touched.dateOfBirth
                      ? LoginScreenStyles.generalContainerError
                      : LoginScreenStyles.generalContainer
                  }
                  onPress={() => {
                    setShow(true);
                    if (Platform.OS === "ios") {
                      return setIsSettingDateOfBirth(true);
                    }
                  }}
                >
                  <TextInput
                    style={
                      errors.dateOfBirth && touched.dateOfBirth
                        ? LoginScreenStyles.inputError
                        : LoginScreenStyles.input
                    }
                    placeholder={t("login.date_of_birth_placeholder")}
                    placeholderTextColor="#f29b7c"
                    value={values.dateOfBirth}
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>
              )}
              {show && (
                <View
                  style={[
                    LoginScreenStyles.datePickerContainer,
                    { alignItems: "center" },
                  ]}
                >
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    textColor="#f29b7c"
                    is24Hour={true}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) =>
                      onChange(event, selectedDate, setFieldValue)
                    }
                  />
                </View>
              )}
              {errors.dateOfBirth && touched.dateOfBirth && (
                <Text style={LoginScreenStyles.error}>
                  {errors.dateOfBirth}
                </Text>
              )}

              {!isSettingDateOfBirth ? (
                <>
                  <TouchableOpacity
                    style={LoginScreenStyles.button}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={LoginScreenStyles.buttonText}>
                      {t("login.continue")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={LoginScreenStyles.secondaryButton}
                    onPress={() => setNextSection(false)}
                  >
                    <Text style={LoginScreenStyles.secodnaryButtonText}>
                      {t("login.code.back")}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={LoginScreenStyles.button}
                  onPress={() => handleDateOfBirth()}
                >
                  <Text style={LoginScreenStyles.buttonText}>
                    {t("login.accept")}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              {userInfo.info.navios_user_active === 1 ? (
                <CodeValidationForm setNextSection={setNextSection} />
              ) : (
                <View style={LoginScreenStyles.generalContainer}>
                  <Text style={LoginScreenStyles.phoneNumberText}>
                    {t("login.account_deleted")}
                  </Text>
                </View>
              )}
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default SignInForm;
