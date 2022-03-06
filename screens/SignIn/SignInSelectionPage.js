import { View, Text, ScrollView } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'

const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="chevron-right"
    size={80}
    style={{ backgroundColor: 'white', size: 50 }}
  />
)
const users = ['Jose Tso', 'Kennith Tso', 'Peter Chen', 'Land Liu']

const SignInSelectionPage = ({ navigation }) => {
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
            color: '#BEAC74',
            fontSize: 25,
            fontFamily: 'CrimsonText-Bold',
          }}
        >
          SINCE {'  '}|{'  '} 1977
        </Text>
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
          Flor De Mayo
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
                style={{ width: 350, marginVertical: 10 }}
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
