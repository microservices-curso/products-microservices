-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pruduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pruduct" ("createdAt", "id", "name", "price", "updatedAt") SELECT "createdAt", "id", "name", "price", "updatedAt" FROM "Pruduct";
DROP TABLE "Pruduct";
ALTER TABLE "new_Pruduct" RENAME TO "Pruduct";
CREATE UNIQUE INDEX "Pruduct_name_key" ON "Pruduct"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
