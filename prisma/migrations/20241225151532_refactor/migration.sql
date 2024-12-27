-- CreateTable
CREATE TABLE "Users" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR NOT NULL,
    "hash" VARCHAR NOT NULL,
    "email" VARCHAR,
    "hashedRt" VARCHAR,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Columns" (
    "column_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "column_name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "Columns_pkey" PRIMARY KEY ("column_id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "card_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "column_id" UUID NOT NULL,
    "card_name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "column_id" UUID NOT NULL,
    "card_id" UUID NOT NULL,
    "comment_name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Columns_column_name_key" ON "Columns"("column_name");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_card_name_key" ON "Cards"("card_name");

-- CreateIndex
CREATE UNIQUE INDEX "Comments_comment_name_key" ON "Comments"("comment_name");

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Columns"("column_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Columns"("column_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("card_id") ON DELETE CASCADE ON UPDATE CASCADE;
