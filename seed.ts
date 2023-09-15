import * as schema from '@infrastructure/persistence/schema'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

// create the connection
const poolConnection = new Database('./Database.db')
const db = drizzle(poolConnection, { schema })

// First, clean the Database
db.delete(schema.productsTable)
db.delete(schema.productCategoriesTable)

const snacksResult = await db
    .insert(schema.productCategoriesTable)
    .values({ name: 'snacks', isService: false })
    .returning({ insertedId: schema.productCategoriesTable.id })

const videoGamesResult = await db
    .insert(schema.productCategoriesTable)
    .values({ name: 'videogames', isService: false })
    .returning({ insertedId: schema.productCategoriesTable.id })

await db.insert(schema.productsTable).values({
    name: 'Doritos',
    pvp: 4,
    categoryId: snacksResult[0].insertedId
})
await db.insert(schema.productsTable).values({
    name: 'Granblue Fantasy',
    pvp: 60,
    categoryId: videoGamesResult[0].insertedId
})

console.log('Example data seeded!')
process.exit(0)
