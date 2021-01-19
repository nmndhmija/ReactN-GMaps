import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";

import colors from "../config/colors.js";

export default function Button({ text, onPress }) {
  return (
    <TouchableScale
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95}
      style={{ flex: 1, paddingHorizontal: 8 }}
      onPress={onPress}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableScale>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.one,
    borderRadius: 25,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.five,
  },
});
