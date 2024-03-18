import React, { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import * as SQLite from "expo-sqlite"
import { Button } from "tamagui"

const db = SQLite.openDatabase("exercises.db")

const SavedItemsPage = () => {
  const [savedItems, setSavedItems] = useState([])

  useEffect(() => {
    loadSavedItems()
  }, [])

  const loadSavedItems = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM exercises;", [], (_, { rows }) => {
        const items = rows._array
        setSavedItems(items)
      })
    })
  }
  const deleteAllItems = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM exercises;", [], (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          setSavedItems([])
        } else {
          console.log("No items deleted")
        }
      })
    })
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>{item.id}</Text>

      <Text>{`Counter: ${item.counter}`}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Items</Text>
      <FlatList
        data={savedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>No saved items</Text>}
      />
      <Button onPress={deleteAllItems}>delete</Button>
      <Button onPress={loadSavedItems}>refresh</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
})

export default SavedItemsPage
