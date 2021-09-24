import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { removeUser } from "../../redux";
import { connect } from "react-redux";
import Item from "../../components/Item";
import { Text } from "native-base";

const OrderHomePage = (props) => {
  const [count, setCount] = useState([]);
  const coffeeData = [
    {
      name: "Bean 1",
      size: "3oz",
    },
    {
      name: "Bean 2",
      size: "5oz",
    },
    {
      name: "Bean 3",
      size: "3oz",
    },
    {
      name: "Bean 4",
      size: "3oz",
    },
    {
      name: "Bean 5",
      size: "7oz",
    },
    {
      name: "Bean 6",
      size: "9oz",
    },
    {
      name: "Bean 7",
      size: "2oz",
    },
    {
      name: "Bean 8",
      size: "8oz",
    },
  ];

  const removeReduxUser = () => {
    props.removeUserData();
  };
  const comfirmOrder = () => {};
  const renderItem = ({ item, index }) => {
    return <Item name={item.name} size={item.size} key={index}></Item>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coffeeData}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => {
          return (
            <View style={styles.titleContainer}>
              <Text style={styles.productDetails}>Product</Text>
              <Text style={styles.productDetails}>Quanitity</Text>
            </View>
          );
        }}
      />

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.loginButton} onPress={removeReduxUser}>
          <Text style={styles.loginButtonText}>Remove user</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={comfirmOrder}>
          <Text style={styles.loginButtonText}>Comfirm Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingRight: "10%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(211,211,211,0.5)",
  },
  productDetails: {
    fontSize: 20,
    fontWeight: "bold",
  },

  // productDetailsQuantity: {
  //   marginLeft: 40,
  //   fontWeight: "bold",
  // },

  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
});
const mapDispatch = (dispatch) => {
  return {
    removeUserData: () => dispatch(removeUser()),
  };
};
export default connect(null, mapDispatch)(OrderHomePage);
