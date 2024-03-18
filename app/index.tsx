import { router } from "expo-router"
import { useEffect } from "react"
import { supabase } from "../utils/supabase"

export default function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/(app)/(tabs)")
      } else {
      }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/(app)/(tabs)")
      } else {
        router.replace("/(app)/(tabs)")
      }
    })
  }, [])
}
