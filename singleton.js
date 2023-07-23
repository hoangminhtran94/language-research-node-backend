const createPrismaMock = require("prisma-mock")
const {PrismaClient, } = require("@prisma/client")
const prisma=require("./utils/db")

jest.mock("./utils/db", () => ({
  ...jest.requireActual("./utils/db"),
  default: mockDeep(),
}))
beforeEach(() => {
  mockReset(prisma)
  createPrismaMock({}, prisma),
})