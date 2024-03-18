import { YStack, H2, Separator, Theme, Button, Header, Text, H6 } from "tamagui"
import { View, Image, StyleSheet } from "react-native"

import { supabase } from "../../../utils/supabase"

export default function SignOut() {
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <YStack bg={"$background"} flex={1} alignItems="center" justifyContent="center">
      <Image
        style={styles.profileImage}
        source={{ uri: "https://www.gravatar.com/avatar/?d=mp" }}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      <Button onPress={signOut}>Sign Out</Button>
    </YStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
})
