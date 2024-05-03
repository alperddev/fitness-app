import { field, relation, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";
import { Associations } from "@nozbe/watermelondb/Model";

export default class Exercises extends Model {
  static table = "exercises";
  static associations: Associations = {
    workouts: {
      type: "belongs_to",
      key: "workout_id",
    },
  };

  @text("name") name;
  @field("loopLength") loopLength;
  @relation("workouts", "workout_id") workout;
}
