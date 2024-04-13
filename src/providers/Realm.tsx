import "react-native-get-random-values";
import { PropsWithChildren } from "react";
import { RealmProvider } from "@realm/react";
import { Exercise, Workout } from "../models/Exercise";
export default function RealmCustomProvider({ children }: PropsWithChildren) {
  return <RealmProvider schema={[Exercise, Workout]}>{children}</RealmProvider>;
}
