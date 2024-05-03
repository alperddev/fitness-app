import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "workouts",
      columns: [
        { name: "name", type: "string" },
        { name: "loopLength", type: "number" },
      ],
    }),
    tableSchema({
      name: "exercises",
      columns: [{ name: "name", type: "string" }],
    }),
  ],
});
