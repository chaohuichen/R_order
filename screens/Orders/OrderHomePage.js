import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { removeUser } from "../../redux";
import { connect } from "react-redux";
import Item from "../../components/Item";
import { ScrollView } from "native-base";
const OrderHomePage = (props) => {
  const coffeeData = [
    "Bean 1",
    "Bean 2",
    "Bean 3",
    "Bean 4",
    "Bean 5",
    "Bean 6",
    "Bean 7",
  ];

  const removeReduxUser = () => {
    props.removeUserData();
  };
  return (
    <ScrollView style={styles.container}>
      {coffeeData.map((ele, index) => (
        <Item name={ele} key={index} />
      ))}

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity style={styles.loginButton} onPress={removeReduxUser}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>
            Remove user
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={removeReduxUser}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>
            Comfirm Order
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginButton: {
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: "black",
    opacity: 0.8,
    flex: 1 / 2,
    marginTop: 20,
  },
});
const mapDispatch = (dispatch) => {
  return {
    removeUserData: () => dispatch(removeUser()),
  };
};
export default connect(null, mapDispatch)(OrderHomePage);
