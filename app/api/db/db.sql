CREATE USER 'backend'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'back'@'%' WITH GRANT OPTION;

DROP SCHEMA IF EXISTS "shop";
CREATE SCHEMA "shop";

CREATE TABLE "shop"."item" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "price" NUMERIC(2) NOT NULL,
    "seller_id" REFERENCES "seller" ("id")
);

CREATE TABLE "shop"."buyer" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(20) NOT NULL,
    "favorite_item_ids" JSON DEFAULT "[]"
);

CREATE TABLE "shop"."seller" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(20) NOT NULL,
    "email": VARCHAR(255) NOT NULL,
    "city": VARCHAR(255) NOT NULL,
    "country": VARCHAR(255) NOT NULL
);
