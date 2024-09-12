BEGIN;

ALTER TABLE "user_has_tree" DROP CONSTRAINT IF EXISTS user_has_tree_user_id_fkey;
ALTER TABLE "user_has_tree" DROP CONSTRAINT IF EXISTS user_has_tree_tree_id_fkey;
ALTER TABLE "command_has_tree" DROP CONSTRAINT IF EXISTS command_has_tree_tree_id_fkey;
ALTER TABLE "command_has_tree" DROP CONSTRAINT IF EXISTS command_has_tree_command_id_fkey;
ALTER TABLE "tree" DROP CONSTRAINT IF EXISTS tree_variety_id_fkey;
ALTER TABLE "command" DROP CONSTRAINT IF EXISTS command_user_id_fkey;

DROP TABLE IF EXISTS "command_has_tree", "user_has_tree", "command", "user", "tree", "variety";

CREATE TABLE "variety" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" VARCHAR(255) NOT NULL UNIQUE,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tree" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" VARCHAR(255) NOT NULL UNIQUE,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "image" VARCHAR(255) NOT NULL,
  "size" DECIMAL NOT NULL,
  "price_ht" DECIMAL NOT NULL,
  "price_ttc" DECIMAL NOT NULL,
  "origin" VARCHAR(255) NOT NULL,
  "variety_id" INT NOT NULL REFERENCES "variety"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "role" VARCHAR(64) NOT NULL,
  "lastname" VARCHAR(64) NOT NULL,
  "firstname" VARCHAR(64) NOT NULL,
  "adress" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "command" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "date" TIMESTAMPTZ NOT NULL,
  "status" VARCHAR(255) NOT NULL,
  "total_price" DECIMAL NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_tree" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "tree_id" INT NOT NULL REFERENCES "tree"("id"),

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "command_has_tree" (
  "id" INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "tree_id" INT NOT NULL REFERENCES "tree"("id"),
  "command_id" INT NOT NULL REFERENCES "command"("id") ON DELETE CASCADE,
  "quantity" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

COMMIT;
