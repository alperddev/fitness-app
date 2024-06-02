import { db } from ".";

export const createTable = async () => {
  await (
    await db
  ).execAsync(`
      create table if not exists workouts
      (id integer primary key autoincrement,
      name text);
      `);

  await (
    await db
  ).execAsync(`
    create table if not exists exercises (
      id integer primary key autoincrement,
      workout_id integer not null,
      name text,
      sets integer,
      reps integer,
      weight integer,
      weight_increase integer,
      looplength integer,
      foreign key(workout_id) references workouts(id) on delete cascade );
      `);
  await (
    await db
  ).execAsync(`
      create table if not exists sets (
        id integer primary key autoincrement,
        exercise_id integer not null,
        reps integer,
        weight integer,
        weight_increase integer,
        looplength integer,
        foreign key(exercise_id) references exercises(id) on delete cascade );
        `);
};
