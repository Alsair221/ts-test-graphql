/*
  Warnings:

  - A unique constraint covering the columns `[profileId,companyId,positionId,dateStart]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_profileId_companyId_positionId_dateStart_key" ON "Experience"("profileId", "companyId", "positionId", "dateStart");
