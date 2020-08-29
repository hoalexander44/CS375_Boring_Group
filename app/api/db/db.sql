DROP SCHEMA IF EXISTS "shop" CASCADE;
CREATE SCHEMA "shop";

CREATE TABLE "shop"."user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "favorite_item_ids" JSON NOT NULL
);

CREATE TABLE "shop"."item" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(20) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "cost" NUMERIC(2) NOT NULL,
    "user_id" integer REFERENCES "shop"."user" ("id")
);

CREATE TABLE "shop"."userFavorites" (
  "user_id" INT REFERENCES "shop"."user" ("id"),
  "item_id" INT REFERENCES "shop"."item" ("id")
); 