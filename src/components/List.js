import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

import colors from "../config/colors.js";
import { useEffect, useState } from "react";

function List({
  title,
  subTitle,
  total,
  onPress,
  onPressSlide,
  type,
  onPressSlideLeft,
  children,
  ...params
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (params.item) progressCalculate(params.item);
  }, [params.item]);

  const progressCalculate = (item) => {
    let progress = 0;
    for (let index = 0; index < item.length; index++) {
      if (item[index].packed) {
        progress = progress + 1;
      }
    }
    setProgress(progress / item.length);
  };

  return (
    <TouchableScale
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95}
      onPress={onPress}
    >
      <View style={styles.list}>
        {params.inDispatch && (
          <MaterialCommunityIcons
            name="truck"
            size={40}
            color={colors.main}
            style={{ marginLeft: 20 }}
          />
        )}
        <View style={styles.productInfo}>
          <Text
            style={{
              fontSize: 20,
              color: colors.four,
              textAlign: "left",
              fontWeight: "bold",
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.five,
                textAlign: "left",
                flex: 1,
              }}
            >
              {subTitle}, {params.state ? params.state.toUpperCase() : ""}
            </Text>

            {progress != 0 && (
              <Text
                style={{
                  fontSize: 14,
                  color: colors.main,
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {parseInt(progress * 100)}
                {"%"}
              </Text>
            )}
          </View>
          {progress != 0 && (
            <View
              style={{
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                top: -2,
              }}
            >
              <Progress.Bar
                color={colors.main}
                progress={progress}
                width={null}
                height={8}
                borderWidth={0}
                unfilledColor={colors.one}
                style={{ width: "100%" }}
              />
            </View>
          )}
        </View>

        <View style={styles.total}>
          <Text
            style={{
              fontSize: 18,
              color: colors.four,
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            {type === "dispatch"
              ? "Items: " + total
              : "₹" + Math.round(parseFloat(total) * 100) / 100}
          </Text>
          {params.tcases && (
            <Text
              style={{
                fontSize: 15,
                color: colors.five,
                textAlign: "right",
                fontWeight: "bold",
                flex: 1,
                maxHeight: 20,
              }}
            >
              Cases: {params.tcases}
            </Text>
          )}
          {type === "product" && (
            <Text
              style={{ fontSize: 12, color: colors.five, textAlign: "right" }}
            >
              {parseInt(params.pieces) +
                parseInt(params.cases) * parseInt(params.ppc)}{" "}
              pcs @ ₹{params.price}
            </Text>
          )}
          {type === "product" && (
            <Text
              style={{ fontSize: 10, color: colors.five, textAlign: "right" }}
            >
              GST: {params.gst}
            </Text>
          )}
          {type != "product" && (
            <Text
              style={{ fontSize: 12, color: colors.five, textAlign: "right" }}
            >
              {params.date}
            </Text>
          )}
        </View>
      </View>
      {children}
    </TouchableScale>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.three,
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    borderRadius: 20,
    alignSelf: "center",
    overflow: "hidden",
  },
  photo: {
    position: "absolute",
    width: "200%",
    height: "100%",
    left: "-50%",
    alignSelf: "center",
  },
  productInfo: {
    left: 20,
    flex: 1.5,
    alignSelf: "center",
  },
  total: {
    right: 10,
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginBottom: 5,
  },
});

export default List;
