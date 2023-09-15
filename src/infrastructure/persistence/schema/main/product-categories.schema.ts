import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { productsTable } from './products.schema'

export const productCategoriesTable = sqliteTable('product_categories', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 100 }).notNull().unique(),
    isService: integer('is_service', { mode: 'boolean' }).notNull()
})

export const productCategoriesRelations = relations(productCategoriesTable, ({ many }) => ({
    products: many(productsTable)
}))
