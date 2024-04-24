import { field, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Post extends Model {
  static table = "posts";

  @text("title") title;
  @field("is_pinned") isPinned;
}
