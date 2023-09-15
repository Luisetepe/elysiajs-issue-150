import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { productCategoriesTable } from './product-categories.schema'

export const productsTable = sqliteTable('products', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 100 }).notNull(),
    pvp: integer('pvp', { mode: 'number' }).notNull(),
    categoryId: integer('category_id', { mode: 'number' }).references(
        () => productCategoriesTable.id
    )
})

export const productsRelations = relations(productsTable, ({ one }) => ({
    category: one(productCategoriesTable, {
        fields: [productsTable.categoryId],
        references: [productCategoriesTable.id]
    })
}))
