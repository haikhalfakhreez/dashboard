-- CreateTable
CREATE TABLE "Namespace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Translation" (
    "translationId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namespaceId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "en" TEXT NOT NULL,
    "id" TEXT,
    "th" TEXT,
    "vn" TEXT,
    CONSTRAINT "Translation_namespaceId_fkey" FOREIGN KEY ("namespaceId") REFERENCES "Namespace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Namespace_name_key" ON "Namespace"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_key_key" ON "Translation"("key");
