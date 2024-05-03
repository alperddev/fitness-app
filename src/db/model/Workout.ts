import { text, children } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";

export default class Workout extends Model {
  static table = "workouts";
  static associations: Associations = {
    exercises: {
      type: "has_many",
      foreignKey: "workout_id",
    },
  };

  @children("exercises") exercises;
  @text("name") name;
}
