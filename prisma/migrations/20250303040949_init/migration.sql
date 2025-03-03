-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezoneOffset" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "ccy" TEXT NOT NULL,
    "ccySymbol" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
