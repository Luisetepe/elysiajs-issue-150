import { IProductCategoryRepository } from '@application/interfaces/product-category.interfaces'
import { CreateProductCategoryRequest } from '@application/use-cases/product-categories/create-product-category.usecase'
import { ProductCategory } from '@domain/entities/product-category.entity'
import { PaginationOptions } from '@shared/shared.types'
import { DbContext } from '../persistence.utils'
import { productCategoriesTable } from '../schema'

/**
 * Service that handles database operations related to {@link ProductCategory}
 */
export class ProductCategoryRepository implements IProductCategoryRepository {
    private readonly _db: DbContext

    /**
     * @param db Service for interfacing with the underlying database.
     */
    constructor(db: DbContext) {
        this._db = db
    }

    public async getAllProductCategories(
        pagination?: PaginationOptions
    ): Promise<ProductCategory[]> {
        let query = this._db.select().from(productCategoriesTable)

        if (pagination) {
            query = query
                .limit(pagination.pageSize)
                .offset(pagination.pageSize * (pagination.page - 1))
        }

        const categories = await query.execute()

        return categories.map(
            (category) => new ProductCategory(category.id, category.name, category.isService)
        )
    }

    public async createProductCategory(
        newCategory: CreateProductCategoryRequest
    ): Promise<ProductCategory> {
        const result = await this._db
            .insert(productCategoriesTable)
            .values(newCategory)
            .returning({ newId: productCategoriesTable.id })

        return new ProductCategory(result[0].newId, newCategory.name, newCategory.isService)
    }
}
