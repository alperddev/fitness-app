import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"
import React from "react"

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "black",
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="signOut"
        options={{
          title: "Sign Out",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
})
