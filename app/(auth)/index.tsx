import React, { useState } from "react"
import { supabase } from "../../utils/supabase"
import { Button, YStack, Input, AlertDialog, XStack } from "tamagui"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setErrorMessage(error.message)
      setIsOpen(true)
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setIsOpen(true)
    }
    if (!session) {
      setErrorMessage("Please check your inbox for email verification!")
      setIsOpen(true)
    }
    setLoading(false)
  }
  function AlertDialogDemo() {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack space>
              <AlertDialog.Description>{errorMessage}</AlertDialog.Description>
              <XStack space="$3" justifyContent="flex-end">
                <AlertDialog.Cancel asChild>
                  <Button>Cancel</Button>
                </AlertDialog.Cancel>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    )
  }

  return (
    <YStack flex={1}>
      <YStack gap={"$5"} m={"$5"}>
        <AlertDialogDemo />
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          {loading ? "Loading..." : "Sign In"}
        </Button>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </YStack>
    </YStack>
  )
}
