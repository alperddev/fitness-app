// import { Realm } from "@realm/react";

// export class Exercise extends Realm.Object {
//   _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
//   name!: string;
//   description?: string;
//   muscleGroups?: string[];
//   workouts?: Workout[];
//   static primaryKey = "_id";
// }

// export class Workout extends Realm.Object {
//   _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
//   name!: string;
//   exercises?: Exercise[];
//   static primaryKey = "_id";
// }
import { Realm } from "@realm/react";
export class Workout extends Realm.Object<Workout> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  exercises?: Exercise[];
  static primaryKey = "_id";
}
export class Exercise extends Realm.Object<Exercise> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  static primaryKey = "_id";
}
