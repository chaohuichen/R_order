import React from 'react'
import { Icon, Text } from 'native-base'
import MainColors from '../constants/MainColors'
// import PayIcon from '../components/PayIcon'
import AppIcons from '../components/AppIcons'
export const tabOptions = (iconName, tabName, iconType = 'FontAwesome') => {
  return {
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          color: focused ? MainColors.primary : '#A1A1A1',
          fontSize: 12,
        }}
      >
        {tabName}
      </Text>
    ),
    tabBarIcon: ({ focused }) => (
      <AppIcons
        name={iconName}
        style={[
          { color: focused ? MainColors.primary : '#A1A1A1', fontSize: 25 },
        ]}
        type={iconType}
      />
    ),
  }
}

export const paymentTabOptions = () => {
  return {
    tabBarLabel: ({ focused }) => {},
    tabBarIcon: ({ focused }) => (
      <PayIcon
        style={{ marginBottom: 10 }}
        width={55}
        height={55}
        fill={focused ? MainColors.primary : '#A1A1A1'}
      />
    ),
    tabBarBadgeStyle: { position: 'absolute', top: 0 },
  }
}

export const tabBarOptions = () => {
  return {
    style: {
      borderTopWidth: 0,
      backgroundColor: 'rgba(255,255,255,1)',
      // position absolute for bottom tab is breaking the pages but is needed for rgba background color
    },
  }
}
