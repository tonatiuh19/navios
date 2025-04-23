import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import store, { RootState } from "./store";
import { selectIsError } from "./store/selectors";
import AppNavigator, {
  RootStackParamList,
} from "./navigation/AppNavigator/AppNavigator";
import { clearState } from "./store/appSlice";
import LoadingMask from "./components/LoadingMask/LoadingMask";
import RetryModal from "./components/RetryModal/RetryModal";
import { StatusBar } from "expo-status-bar";
import "./i18n";
import { useTranslation } from "react-i18next";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <InnerRootLayout />
      </ApplicationProvider>
    </Provider>
  );
}

function InnerRootLayout() {
  const dispatch = useDispatch();
  const isLoading =
    useSelector((state: RootState) => state.app.isLoading) ?? false;
  const isError = useSelector(selectIsError);
  const [retryModalVisible, setRetryModalVisible] = useState(false);
  const [retryMessage, setRetryMessage] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation(); // Use the translation hook

  const handleRetry = () => {
    console.log("Retrying...");
    const state = navigation.getState();
    const mainScreenExists = state?.routeNames?.includes("Main");
    dispatch(clearState());
    if (mainScreenExists) {
      navigation.dispatch(
        CommonActions.navigate({
          name: "Main",
        })
      );
    } else {
      console.log("Main screen doesn't exist, navigating to Login");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }
    setRetryModalVisible(false);
  };

  const handleClose = () => {
    setRetryModalVisible(false);
  };

  useEffect(() => {
    if (isError) {
      setRetryMessage(t("noInternet")); // Use translation for the error message
      setRetryModalVisible(true);
    }
  }, [isError, t]);

  return (
    <>
      <AppNavigator />
      <LoadingMask isLoading={isLoading} />
      <RetryModal
        visible={retryModalVisible}
        message={retryMessage}
        onRetry={handleRetry}
        onClose={handleClose}
      />
      <StatusBar style="auto" />
    </>
  );
}
