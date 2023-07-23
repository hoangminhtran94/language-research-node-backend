const prisma = require("../utils/db");
const { readCSV } = require("../utils/read-csv");
async function main() {
  const csvData = await readCSV("32100260.csv");
  const promises = [];

  try {
    //user
    await prisma.vegetableRecord.createMany({
      data: csvData.map((data) => ({
        ...data,
        UOM_ID: +data["UOM_ID"],
        SCALAR_ID: +data["SCALAR_ID"],
        VALUE: +data["VALUE"],
        DECIMALS: +data["DECIMALS"],
      })),
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
