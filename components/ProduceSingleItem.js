import React, { memo } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { Box } from 'native-base'
import AppIcons from './AppIcons'
import { Badge } from 'react-native-paper'
import { Button } from 'react-native-paper'
const Item = memo(
  ({ order, removeItem, addItem }) => {
    return (
      <Box style={styles.box}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingRight: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {order.count !== 0 && (
            <Badge
              size={45}
              style={{
                position: 'absolute',
                top: -10,
                left: -10,
                fontWeight: 'bold',
                fontSize: 25,
                zIndex: 99,
                backgroundColor: '#BEAC74',
                color: 'white',
              }}
            >
              {order.count}
            </Badge>
          )}
          <TouchableWithoutFeedback onPress={addItem}>
            <Image
              source={{
                uri:
                  order.locationImgUrl ||
                  'https://fillupstore.s3.amazonaws.com/default_coffee_2.jpg',
              }}
              style={{
                height: 130,
                width: 150,
                borderRadius: 5,
                resizeMode: 'stretch',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '60%',
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 'bold',
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              {order.name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              {order.address}
            </Text>

            {order.count === 0 ? (
              <Button
                mode="outlined"
                style={styles.buttonBox}
                onPress={addItem}
                title="add"
              >
                <Text
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                  }}
                >
                  add to reserve
                </Text>
              </Button>
            ) : (
              <View style={[styles.buttonBox, styles.actionBox]}>
                <AppIcons
                  type="AntDesign"
                  name="minus"
                  size={25}
                  color="white"
                  style={{ alignSelf: 'center' }}
                  onPress={removeItem}
                />

                <View
                  style={{
                    width: '30%',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    bold
                    style={{
                      color: 'white',
                      fontSize: 20,
                      letterSpacing: 0.5,
                    }}
                  >
                    {order.count}
                  </Text>
                </View>

                <AppIcons
                  type="AntDesign"
                  name="plus"
                  size={25}
                  color="white"
                  style={{ alignSelf: 'center' }}
                  onPress={addItem}
                />
              </View>
            )}
          </View>
        </View>
      </Box>
    )
  },
  (prev, next) => {
    const prevCount = prev.order.count
    const nextCount = next.order.count
    const isEqual = prevCount === nextCount
    return isEqual
  }
)

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211,211,211,0.5)',
    paddingHorizontal: 15,
    width: '100%',
    height: 160,
  },
  buttonBox: {
    paddingVertical: 0,
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 30,
    borderColor: 'white',
    borderWidth: 1,
  },
  actionBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 5,
  },
  orderTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderSize: {
    color: 'white',
  },
})

export default Item

{
  /* <View style={styles.actionBox}>
          <TouchableWithoutFeedback
            onPress={removeItem}
            style={{
              backgroundColor: 'white',
              borderRadius: 50 / 2,
              width: 50,
              height: 50,
              justifyContent: 'center',
            }}
          >
            <AppIcons
              type="AntDesign"
              name="minus"
              size={25}
              color="black"
              style={{ alignSelf: 'center' }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '30%',
              alignItems: 'center',
            }}
          >
            <Text
              bold
              style={{ color: 'white', fontSize: 20, letterSpacing: 0.5 }}
            >
              {order.count}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={addItem}
            style={{
              backgroundColor: 'white',
              borderRadius: 50 / 2,
              width: 50,
              height: 50,
              justifyContent: 'center',
            }}
          >
            <AppIcons
              type="AntDesign"
              name="plus"
              size={25}
              color="black"
              style={{ alignSelf: 'center' }}
            />
          </TouchableWithoutFeedback>
        </View> */
}
