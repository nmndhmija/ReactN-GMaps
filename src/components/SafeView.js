import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import colors from "../config/colors";
import { useNetInfo } from "@react-native-community/netinfo";

function SafeView({ children, zeropad }) {
  const netInfo = useNetInfo();
  return (
    <>
      {netInfo.type !== "unknown" && netInfo.isInternetReachable === false && (
        <View
          style={{
            backgroundColor: colors.main,
            height:
              Platform.OS === "android" ? 35 : Constants.statusBarHeight + 35,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            There is a problem connecting to the server, some functionality
            might not be available.
          </Text>
        </View>
      )}
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            marginHorizontal: Platform.OS === "android" ? 0 : zeropad ? 0 : 10,
            marginTop: 10,
            marginBottom: 75,
          }}
        >
          <StatusBar
            backgroundColor={
              netInfo.type !== "unknown" &&
              netInfo.isInternetReachable === false
                ? colors.main
                : colors.two
            }
            barStyle={
              netInfo.type !== "unknown" &&
              netInfo.isInternetReachable === false
                ? "dark-content"
                : "light-content"
            }
          />
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.two,
    alignContent: "space-between",
    flexDirection: "column",
    paddingHorizontal: 10,
    // marginHorizontal: Platform.OS === "android" ? 0 : 10,
    // marginTop: 10,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SafeView;
