import { text, children } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Workouts extends Model {
  static table = "workouts";
  static associations = {
    exercises: { type: "has_many", foreignKey: "workout_id" },
  };

  @text("name") name: string;
  @children("exercises") exercises: any;
}
