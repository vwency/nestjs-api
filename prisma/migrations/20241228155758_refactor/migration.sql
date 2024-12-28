-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_user_id_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" VARCHAR DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
