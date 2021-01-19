import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  FlatList,
  Platform,
  TextInput,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

import SafeView from "../components/SafeView";
import ErrorMessage from "../components/Form/ErrorMessage";
import ButtonContainer from "../components/ButtonContainer";
import Button from "../components/Buttons";
import colors from "../config/colors";
import List from "../components/List.js";

function LoginScreen() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [response, setResponse] = useState([]);
  const [userField, setUserField] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const mapstyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70",
        },
      ],
    },
  ];

  useEffect(() => {
    getLocationPermission();
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  const getLocationPermission = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      console.log("D E N I E D");
    }
  };

  const getList = () => {
    return fetch("https://jsonplaceholder.typicode.com/users").then((data) =>
      data.json()
    );
  };

  const setItem = (item) => {
    setLoading(true);
    if (item.name) {
      setError(false);
      item.email = item.email ? item.email : "null";
      item.username = item.username ? item.username : "null";
      return fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((json) => setResponse(json))
        .then(setLoading(false));
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <SafeView>
      <View style={styles.scroll}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapstyle}
          region={{
            latitude: location
              ? parseFloat(location.coords.latitude)
              : 30.33843,
            longitude: location
              ? parseFloat(location.coords.longitude)
              : 76.830093,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: location
                ? parseFloat(location.coords.latitude)
                : 30.33843,
              longitude: location
                ? parseFloat(location.coords.longitude)
                : 76.830093,
            }}
          />
        </MapView>
        {!loading ? (
          <ButtonContainer>
            <Button
              text="LOCATE"
              onPress={async () => {
                setLoading(true);
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                setLoading(false);
              }}
            />
          </ButtonContainer>
        ) : (
          <ActivityIndicator
            size="large"
            color={colors.four}
            style={{ paddingTop: 10 }}
          ></ActivityIndicator>
        )}

        <ErrorMessage error={errorMsg} visible={errorMsg} />
        {/* <FlatList
          data={list}
          keyExtractor={(item) => {
            list.indexOf(item);
          }}
          renderItem={({ item }) => (
            <List
              key={list.indexOf(item)}
              title={item.name}
              subTitle={item.username}
              date={item.email}
              total={item.id}
              type="order"
            />
          )}
        /> */}
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.scroll}
        keyboardVerticalOffset={Platform.select({ ios: 200, android: 100 })}
      >
        <View>
          <Text style={[styles.text, { textAlign: "center" }]}>Add New</Text>
          <View style={styles.inputs}>
            <Text style={styles.text}>Name *</Text>
            <TextInput
              style={styles.loginInput}
              onChangeText={(text) =>
                setUserField({ ...userField, name: text })
              }
            />
          </View>
          <View style={styles.inputs}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.loginInput}
              onChangeText={(text) =>
                setUserField({ ...userField, email: text })
              }
            />
          </View>
          <View style={styles.inputs}>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.loginInput}
              onChangeText={(text) =>
                setUserField({ ...userField, username: text })
              }
            />
          </View>

          <ButtonContainer>
            <Button
              text="PUSH"
              login={false}
              onPress={() => setItem(userField)}
            />
          </ButtonContainer>

          <ErrorMessage error="Invalid and/or Empty fields." visible={error} />
          <Text style={[styles.text, { textAlign: "center" }]}>
            PUSH response:
          </Text>

          <List
            title={response.name}
            subTitle={response.username}
            date={response.email}
            state={response.phone}
            total={response.id}
            type="order"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    flex: 1,
    maxHeight: 230,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.two,
    borderRadius: 30,
    overflow: "hidden",
  },
  inputs: {
    flex: 1,
    minHeight: 60,
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: colors.four,
    fontWeight: "bold",
    left: 0,
    paddingHorizontal: 10,
  },
  loginInput: {
    backgroundColor: colors.one,
    fontSize: 20,
    height: 45,
    color: colors.four,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "right",
    borderRadius: 25,
    paddingRight: 10,
    fontWeight: "bold",
    flex: 1,
  },
  scroll: {
    width: "100%",
    flex: 1,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.two,
    borderRadius: 30,
    alignContent: "space-between",
  },
  map: {
    flex: 1,
    borderRadius: 25,
  },
});

export default LoginScreen;
