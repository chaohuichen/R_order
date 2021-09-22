import React, { useState } from "react";
import { Text, Box, View, Button, Input } from "native-base";
import { StyleSheet, TextInput } from "react-native";
import AppIcons from "../components/AppIcons";
export default function Item(props) {
  const [itemCount, setItemCount] = useState(0);
  return (
    <Box style={styles.box}>
      <Text> {props.name}</Text>
      <View style={styles.actionBox}>
        <Button size="xs" onPress={() => setItemCount(itemCount - 1)}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}> - </Text>
        </Button>
        <Input
          variant="outline"
          size="xs"
          value={itemCount + ""}
          style={{
            textAlign: "center",
            width: 50,
            backgroundColor: "#f1f1f1",
            borderWidth: 0,
            padding: 0,
          }}
          mx={1}
          placeholder="0"
        />
        <Text></Text>
        <Button
          size="xs"
          styles={styles.button}
          onPress={() => setItemCount(itemCount + 1)}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}> + </Text>
        </Button>
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(211,211,211,0.5)",
    padding: 20,
    width: "100%",
    height: 80,
  },
  actionBox: {
    flexDirection: "row",
  },
  button: {
    padding: 0,
    margin: 0,
  },
});
