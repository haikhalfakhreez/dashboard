import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const data = [
    {
      namespace: "property",
      key: "property.selectProperty.title",
      en: "Choose the main Property you would promote with",
      id: "Pilih Property",
      th: "Thailand Property",
      vn: "Saya Vietnam",
    },
    {
      namespace: "common",
      key: "login",
      en: "Login",
      id: "Masuk",
      th: "Lai",
      vn: "Dang nhap",
    },
  ]

  for (let item of data) {
    // Find or create the namespace
    const namespace = await prisma.namespace.upsert({
      where: { name: item.namespace },
      update: {},
      create: { name: item.namespace },
    })

    // Create the translation with the namespaceId
    await prisma.translation.create({
      data: {
        namespaceId: namespace.id,
        key: item.key,
        en: item.en,
        id: item.id,
        th: item.th,
        vn: item.vn,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
