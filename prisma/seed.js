/**
 * @file Import data from CSV file into the database using Prisma.
 * @description This script reads data from a CSV file and inserts it into the database using Prisma.
 * @author Minh Hoang Tran
 * @studentNumber 041016957
 */

const prisma = require("../utils/db");
const { readCSV } = require("../utils/read-csv");

/**
 * Function to import data from a CSV file into the database using Prisma.
 * @async
 * @function main
 * @returns {Promise<void>} - A Promise that resolves when the data import is completed or rejects if an error occurs.
 */
async function main() {
  try {
    // Read data from the CSV file
    const csvData = await readCSV("32100260.csv");

    // Convert and insert data into the database using Prisma
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
    // Disconnect the Prisma client after data import is completed or an error occurs
    await prisma.$disconnect();
  }
}

// Call the main function to import data from the CSV file
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
