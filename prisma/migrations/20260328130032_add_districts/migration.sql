-- AlterTable
ALTER TABLE "GameRequest" ADD COLUMN     "districts" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "districts" TEXT[] DEFAULT ARRAY[]::TEXT[];
