import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { getUsers } from '../../API/databaseCall'
const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="chevron-right"
    size={80}
    style={{ backgroundColor: 'white', size: 50 }}
  />
)

const SignInSelectionPage = ({ navigation }) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers().then((res) => {
      setUsers(Object.keys(res.val()))
    })
  }, [])
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 100,
      }}
    >
      <View style={{ alignItems: 'center', marginTop: 100 }}>
        <Text
          style={{
            fontSize: 60,
            lineHeight: 90,
            fontWeight: '600',
            textAlign: 'center',
            fontFamily: 'CrimsonText-Bold',
            color: 'white',
          }}
        >
          TG GHQ
        </Text>
        {users.map((singleUser, index) => {
          return (
            <Animatable.View
              animation="fadeInUp"
              direction="alternate"
              key={index}
              iterationDelay={100 * index}
            >
              <Card
                style={{ width: 360, marginVertical: 10 }}
                onPress={() =>
                  navigation.push('SignInPage', { user: singleUser })
                }
              >
                <Card.Title
                  title={singleUser}
                  //   subtitle="CEO"
                  right={LeftContent}
                />
              </Card>
            </Animatable.View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default SignInSelectionPage
