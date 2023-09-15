import { IProductRepository } from '@application/interfaces/product.interfaces'
import { CreateProductRequest } from '@application/use-cases/products/create-product.usecase'
import { Product } from '@domain/entities/product.entity'
import { PaginationOptions } from '@shared/shared.types'
import { DbContext } from '../persistence.utils'
import { productsTable } from '../schema'

/**
 * Service that handles database operations related to {@link Product}
 */
export class ProductRepository implements IProductRepository {
    private readonly _db: DbContext

    /**
     * @param db Service for interfacing with the underlying database.
     */
    constructor(db: DbContext) {
        this._db = db
    }

    public async getAllProducts(pagination?: PaginationOptions): Promise<Product[]> {
        let query = this._db.select().from(productsTable)

        if (pagination) {
            query = query
                .limit(pagination.pageSize)
                .offset(pagination.pageSize * (pagination.page - 1))
        }

        const products = await query.execute()

        return products.map(
            (product) =>
                new Product(product.id, product.name, product.pvp, product.categoryId ?? undefined)
        )
    }

    public async createProduct(newProduct: CreateProductRequest) {
        const result = await this._db
            .insert(productsTable)
            .values(newProduct)
            .returning({ newId: productsTable.id })

        return new Product(result[0].newId, newProduct.name, newProduct.pvp, newProduct.categoryId)
    }
}
