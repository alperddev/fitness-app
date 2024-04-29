import { field, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Exercises extends Model {
  static table = "exercises";
  static associations = {
    workouts: { type: "belongs_to", key: "workout_id" },
  };
  @text("name") name: string;
  @field("loopLength") loopLength: number;
}
