import React from "react";
import { View, StyleSheet } from "react-native";

function ButtonContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "space-between",
    maxHeight: 70,
    minHeight: 70,
  },
});
export default ButtonContainer;
