-- AlterTable
ALTER TABLE "Cards" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Columns" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "description" DROP NOT NULL;
