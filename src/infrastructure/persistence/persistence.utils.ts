import * as schema from '@infrastructure/persistence/schema'
import { Database } from 'bun:sqlite'
import { BunSQLiteDatabase, drizzle } from 'drizzle-orm/bun-sqlite'

export function getDatabaseConnectionPool() {
    const poolConnection = new Database('./Database.db')

    return drizzle(poolConnection, { schema })
}

export type DbContext = BunSQLiteDatabase<typeof schema>
