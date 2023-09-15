import type { Config } from 'drizzle-kit'

export default {
    schema: './src/infrastructure/persistence/schema/**/*.schema.ts',
    out: './src/infrastructure/persistence/migrations',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!
    }
} satisfies Config
