import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

// create the connection
const poolConnection = new Database('./Database.db')
const db = drizzle(poolConnection)

// this will automatically run needed migrations on the database
await migrate(db, {
    migrationsFolder: './src/infrastructure/persistence/migrations'
})

console.log('Migrations applied!')
process.exit(0)
