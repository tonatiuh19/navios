import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Linking } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { LoginScreenStyles } from "../LoginScreen.style";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../store/selectors";
import { AppDispatch } from "../../../store";
import { sendCodeByMail, validateSessionCode } from "../../../store/effects";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/AppNavigator/AppNavigator";
import Countdown from "@/app/components/Countdown/Countdown";
import { useTranslation } from "react-i18next";

const CodeValidationForm: React.FC<any> = ({ setNextSection }) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSendCode, setIsSendCode] = useState(false);
  const [disabledResend, setDisabledResend] = useState(true);
  const [codeInvalid, setCodeInvalid] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const navigation = useNavigation();

  useEffect(() => {
    if (userInfo.isIncorrectCode) {
      setDisabledResend(false);
      setCodeInvalid(true);
    } else {
      setCodeInvalid(false);
    }

    if (userInfo.isUserValidated) {
    }
  }, [userInfo, navigation]);

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required(t("login.code.required"))
      .matches(/^\d{6}$/, t("login.code.invalid_format")),
  });

  const sendCoding = () => {
    setIsSendCode(true);
    dispatch(
      sendCodeByMail(
        userInfo.info.navios_user_id,
        userInfo.info.navios_user_email
      )
    );
  };

  const resendCode = (resetForm: () => void) => {
    setCodeInvalid(false);
    setDisabledResend(true);
    setIsSendCode(false);
    setSelectedOption(null);
    resetForm(); // Reset the form
  };

  const handleCodeValidation = (values: any) => {
    console.log("Code Validation", values);
    dispatch(validateSessionCode(userInfo.info.navios_user_id, values.code));
  };

  const countDownComplete = (resetForm: () => void) => {
    setDisabledResend(false);
  };

  return (
    <Formik
      initialValues={{ code: "" }}
      validationSchema={validationSchema}
      onSubmit={handleCodeValidation}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
      }) => (
        <>
          <Text style={LoginScreenStyles.label}>
            {t("login.code.instructions")}
          </Text>
          {true && (
            <>
              {!isSendCode ? (
                <>
                  <TouchableOpacity
                    style={LoginScreenStyles.button}
                    onPress={() => sendCoding()}
                  >
                    <Text style={LoginScreenStyles.buttonText}>
                      {t("login.code.send")}
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
                <>
                  <TextInput
                    style={[
                      errors.code && touched.code
                        ? LoginScreenStyles.inputError
                        : LoginScreenStyles.input,
                      { textAlign: "center" }, // Center the text
                    ]}
                    placeholder={t("login.code.placeholder")}
                    placeholderTextColor="#f29b7c"
                    onChangeText={handleChange("code")}
                    onBlur={handleBlur("code")}
                    value={values.code}
                    keyboardType="numeric"
                  />
                  {errors.code && touched.code && (
                    <Text style={LoginScreenStyles.error}>{errors.code}</Text>
                  )}
                  {codeInvalid && (
                    <Text style={LoginScreenStyles.error}>
                      {t("login.code.invalid")}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={LoginScreenStyles.button}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={LoginScreenStyles.buttonText}>
                      {t("login.code.validate")}
                    </Text>
                  </TouchableOpacity>
                  {disabledResend ? (
                    <>
                      <Text style={LoginScreenStyles.timerResendText}>
                        {t("login.code.resend_instructions")}
                      </Text>
                      <Countdown
                        style={{
                          timerText: LoginScreenStyles.timerCodeText,
                          timerTextRed: LoginScreenStyles.timerCodeTextRed,
                        }}
                        duration={90}
                        onComplete={() => countDownComplete(resetForm)}
                      />
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={LoginScreenStyles.secondaryButton}
                        onPress={() => resendCode(resetForm)}
                      >
                        <Text style={LoginScreenStyles.buttonLinkText}>
                          {t("login.code.resend")}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={
                          (LoginScreenStyles.termsText,
                          {
                            color: "#ff0000", // Red text color
                            textAlign: "center",
                          })
                        }
                      >
                        {t("login.code.check_spam")}
                      </Text>
                    </>
                  )}
                </>
              )}
            </>
          )}
          <Text style={LoginScreenStyles.termsText}>
            {t("login.code.terms_prefix")}{" "}
            <Text
              style={LoginScreenStyles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://intelipadel.com/terminosycondiciones/padelroom"
                )
              }
            >
              {t("login.code.terms")}
            </Text>{" "}
            {t("login.code.and")}{" "}
            <Text
              style={LoginScreenStyles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://intelipadel.com/avisodeprivacidad/padelroom"
                )
              }
            >
              {t("login.code.privacy")}
            </Text>
            .
          </Text>
        </>
      )}
    </Formik>
  );
};

export default CodeValidationForm;
