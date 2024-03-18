import "react-native-url-polyfill/auto"
import * as SecureStore from "expo-secure-store"
import { createClient } from "@supabase/supabase-js"

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

const supabaseUrl = "https://qttivcxubhijjydeaykz.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dGl2Y3h1Ymhpamp5ZGVheWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1Mjk1MTIsImV4cCI6MjAyMDEwNTUxMn0.eMQax2ywQY5sTyC9BAdz2ZC3Ub4fOUK6aANMZJf7nRI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
